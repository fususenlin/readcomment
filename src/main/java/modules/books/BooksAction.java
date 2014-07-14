package modules.books;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import com.mongodb.DB;
import com.mongodb.DBCollection;
import com.mongodb.DBCursor;
import com.mongodb.DBObject;
import com.mongodb.Mongo;
import com.opensymphony.xwork2.ActionSupport;

public class BooksAction extends ActionSupport {

	private int start; // 从某处开始获取 0
	private int limit; // 获取N个
	private List<Book> books;

	@Override
	public String execute() throws IOException {

		books = new ArrayList<Book>();
		Mongo mongo = new Mongo("localhost", 27017);
		DB db = mongo.getDB("readcomment");

		DBCollection booksCollection = db.getCollection("books");

		// 使用collection的find方法查找document
		DBCursor cursor = booksCollection.find();
		if (this.getLimit() != 0) {
			cursor.limit(this.getLimit());
		}
		cursor.skip(start);
		// 循环输出结果
		while (cursor.hasNext()) {
			dosome(cursor);
		}

		mongo.close();
		return "success";
	}

	public void dosome(DBCursor cursor) {
		DBObject obj = cursor.next();
		Book book = new Book();
		book.setId(obj.get("_id").toString());
		book.setTitle(obj.get("title").toString());
		book.setAuthor(obj.get("author").toString());
		book.setCount(Integer.valueOf(obj.get("count").toString()));
		books.add(book);
		System.out.println(obj.toString());
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

	public List<Book> getBooks() {
		return books;
	}

	public void setBooks(List<Book> books) {
		this.books = books;
	}
}
