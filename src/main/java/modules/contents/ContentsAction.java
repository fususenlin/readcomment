package modules.contents;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import com.mongodb.BasicDBObject;
import com.mongodb.DB;
import com.mongodb.DBCollection;
import com.mongodb.DBCursor;
import com.mongodb.DBObject;
import com.mongodb.Mongo;
import com.opensymphony.xwork2.ActionSupport;

public class ContentsAction extends ActionSupport {

	private String book;
	private int start; // 从某处开始获取 0
	private int limit; // 获取N个
	private List<String> contents;

	@Override
	public String execute() throws IOException {
		

		Mongo mongo = new Mongo("localhost", 27017);
		DB db = mongo.getDB("readcomment");

		DBCollection contentsCollection = db.getCollection("contents");

        // 使用collection的find方法查找document
		BasicDBObject queryContent = new BasicDBObject();
		queryContent.put("book", this.getBook());

		contents = new ArrayList<String>();

		DBCursor cursor = contentsCollection.find(queryContent);
		if (this.getLimit() != 0) {
			cursor.limit(this.getLimit());
		}
		cursor.skip(start);
        //循环输出结果
        while (cursor.hasNext()) {
			DBObject obj = cursor.next();
			contents.add(obj.get("content").toString());
			System.out.println(obj.toString());
		}

		mongo.close();
		return "success";
	}

	public List<String> getContents() {
		return contents;
	}

	public void setContents(List<String> contents) {
		this.contents = contents;
	}

	public String getBook() {
		return book;
	}

	public void setBook(String book) {
		this.book = book;
	}

	public int getStart() {
		return start;
	}

	public void setStart(int start) {
		this.start = start;
	}


	public int getLimit() {
		return limit;
	}

	public void setLimit(int limit) {
		this.limit = limit;
	}

}
