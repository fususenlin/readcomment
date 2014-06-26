package modules.loadBook;

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

public class LoadBookAction extends ActionSupport {

	private File file; // 文件域
	private String author; // 文件类型
	private String title; // 文件名

	@Override
	public String execute() throws IOException {
		// 以服务器的文件保存地址的原文件名建立上传文件输出流
		String fileName = "D:\\books" + title + ".txt";
		FileOutputStream fos = new FileOutputStream(fileName);
		// 以上传文件建立文件输入流
		FileInputStream fis = new FileInputStream(this.getFile());
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
		books.insert(book);
		
		DBCollection contents = db.getCollection("contents");
		BufferedReader br = new BufferedReader(new InputStreamReader(fis,
				"UTF-8"));

		String str = new String();
		while ((str = br.readLine()) != null) {
			System.out.println(str);
			BasicDBObject content = new BasicDBObject();
			content.put("book", book.get("_id").toString());
			content.put("content", str);
			contents.insert(content);
			System.out.println();
		}
		br.close();

		// 创建要查询的document
        BasicDBObject searchQuery = new BasicDBObject();
		searchQuery.put("book", book.get("_id").toString());
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

	public File getFile() {
		return file;
	}

	public void setFile(File file) {
		this.file = file;
	}


	public String getAuthor() {
		return author;
	}


	public void setAuthor(String author) {
		this.author = author;
	}

}
