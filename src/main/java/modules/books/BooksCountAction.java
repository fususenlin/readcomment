package modules.books;

import java.io.IOException;

import com.mongodb.DB;
import com.mongodb.DBCollection;
import com.mongodb.DBCursor;
import com.mongodb.Mongo;
import com.opensymphony.xwork2.ActionSupport;

public class BooksCountAction extends ActionSupport {

	private int count;

	@Override
	public String execute() throws IOException {
		

		Mongo mongo = new Mongo("localhost", 27017);
		DB db = mongo.getDB("readcomment");

		DBCollection booksCollection = db.getCollection("books");

        // 使用collection的find方法查找document
		DBCursor cursor = booksCollection.find();
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


}
