package modules.contents;

import java.io.IOException;

import com.mongodb.BasicDBObject;
import com.mongodb.DB;
import com.mongodb.DBCollection;
import com.mongodb.DBCursor;
import com.mongodb.Mongo;
import com.opensymphony.xwork2.ActionSupport;

public class ContentsCountAction extends ActionSupport {

	private int book;
	private int count;

	@Override
	public String execute() throws IOException {
		

		Mongo mongo = new Mongo("localhost", 27017);
		DB db = mongo.getDB("readcomment");

		DBCollection contentsCollection = db.getCollection("contents");

        // 使用collection的find方法查找document
		BasicDBObject queryContent = new BasicDBObject();
		queryContent.put("book", this.getBook());

		DBCursor cursor = contentsCollection.find(queryContent);
		count = cursor.count();

		mongo.close();
		return "success";
	}

	public int getCount() {
		return count;
	}

	public void setCount(int count) {
		this.count = count;
	}

	public int getBook() {
		return book;
	}

	public void setBook(int book) {
		this.book = book;
	}

}
