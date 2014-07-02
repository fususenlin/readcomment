package modules.bookUpload;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStreamReader;

import com.mongodb.BasicDBObject;
import com.mongodb.DB;
import com.mongodb.DBCollection;
import com.mongodb.DBCursor;
import com.mongodb.Mongo;
import com.opensymphony.xwork2.ActionSupport;

public class BookUploadAction extends ActionSupport {

	private File txt; // 文件域
	private String imageUrl; // 文件域
	private String author; // 文件类型
	private String title; // 文件名
	private String bookId;

	@Override
	public String execute() throws IOException {

		// 以服务器的文件保存地址的原文件名建立上传文件输出流
		String fileName = "D:\\books" + title + ".txt";
		FileOutputStream fos = new FileOutputStream(fileName);
		// 以上传文件建立文件输入流
		FileInputStream fis = new FileInputStream(this.getTxt());
		// 将上传文件内容写入服务器
		
		/*
		 * byte[] b = new byte[1024]; int len = 0; while ((len = fis.read(b)) >
		 * 0) { fos.write(b, 0, len); } fis.reset();
		 */

		Mongo mongo = new Mongo("localhost", 27017);
		DB db = mongo.getDB("readcomment");

		DBCollection books = db.getCollection("books");
		BasicDBObject book = new BasicDBObject();
		book.put("title", this.getTitle());
		book.put("author", this.getAuthor());
		book.put("imageUrl", this.getImageUrl());
		books.insert(book);
		
		bookId = book.get("_id").toString();
		
		/**
		 * 保存文件到GFS
		 */
		/*
		 * try { // 存储fs的根节点 GridFS gridFS = new GridFS(db, "books");
		 * GridFSInputFile gfsTxt = gridFS.createFile(this.getTxt());
		 * gfsTxt.put("aliases", "rc.books"); gfsTxt.put("filename", book +
		 * "_txt"); gfsTxt.put("contentType", "txt"); gfsTxt.save(); } catch
		 * (Exception e) { e.printStackTrace();
		 * System.out.println("存储文件时发生错误！！！"); }
		 * 
		 * GridFS gridFS = new GridFS(db, "books"); GridFSDBFile dbfile =
		 * gridFS.findOne(bookId + "_txt"); dbfile.getInputStream(); if (dbfile
		 * != null) { // dbfile }
		 */

		/**
		 * 将段落诗句存入contents表
		 */
		DBCollection contents = db.getCollection("contents");
		InputStreamReader inr = new InputStreamReader(fis, "GB2312");
		BufferedReader br = new BufferedReader(inr);
		String str = new String();
		while ((str = br.readLine()) != null) {
			if ("".equals(str)) {
				continue;
			}
			System.out.println(str);
			BasicDBObject content = new BasicDBObject();
			content.put("book", bookId);
			content.put("content", str);
			contents.insert(content);
			System.out.println();
		}
		br.close();

		// 创建要查询的document
        BasicDBObject searchQuery = new BasicDBObject();
		searchQuery.put("book", bookId);
        // 使用collection的find方法查找document
		DBCursor cursor = contents.find(searchQuery);
        //循环输出结果
        while (cursor.hasNext()) {
			System.out.println(cursor.next());
		}
		System.out.println("Done");
		mongo.close();

		return "success";
	}


	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getAuthor() {
		return author;
	}


	public void setAuthor(String author) {
		this.author = author;
	}

	public File getTxt() {
		return txt;
	}


	public void setTxt(File txt) {
		this.txt = txt;
	}


	public String getImageUrl() {
		return imageUrl;
	}


	public void setImageUrl(String imageUrl) {
		this.imageUrl = imageUrl;
	}

	public String getBookId() {
		return bookId;
	}

	public void setBookId(String bookId) {
		this.bookId = bookId;
	}

}
