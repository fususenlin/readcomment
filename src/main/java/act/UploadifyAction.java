package act;

/**
 * @filename Uploadify.java
 * @author maosheng
 * @ctreateTime 下午8:51:57
 */

import java.io.BufferedReader;
import java.io.File;
import java.io.FileInputStream;

import java.io.InputStreamReader;
import java.nio.charset.Charset;
import java.util.ArrayList;
import java.util.List;
import java.util.StringTokenizer;

import javax.servlet.http.HttpServletResponse;

import main.Content;

import org.apache.struts2.ServletActionContext;

import org.hibernate.Session;
import org.hibernate.Transaction;

import session.HibernateSessionFactory;

import com.opensymphony.xwork2.ActionSupport;

import dao.BooksInfo;
import dao.BooksInfoDAO;
import dao.ParagraphsInfo;
import dao.ParagraphsInfoDAO;

public class UploadifyAction extends ActionSupport {

	private File myfile;
	private String myfileFileName;

	public void doUpload() {
		File dir = new File(myfileFileName);
		if (!dir.exists()) {
			dir.mkdirs();
		}

		String document = readFile(myfile);
		List<Content> contentList = printParaCount(document);

		Session session = HibernateSessionFactory.getSession();
		Transaction tx = session.beginTransaction();
		try {
			BooksInfoDAO bdao = new BooksInfoDAO();
			BooksInfo book = new BooksInfo();
			book.setName("aawqwaaa");
			book.setParagraphCount(contentList.size());
			bdao.save(book);

			ParagraphsInfoDAO paraDao = new ParagraphsInfoDAO();
			int bookId = book.getId();
			for (Content content : contentList) {
				ParagraphsInfo para = new ParagraphsInfo();
				para.setBookId(bookId);
				para.setContent(content.getContent());
				paraDao.save(para);
			}
			HttpServletResponse response = ServletActionContext.getResponse();
			// TODO id 设置为0，才可以新增
			tx.commit();
			response.setContentType("text/plain;charset=utf-8");
			response.getWriter().append(book.getId().toString());

		} catch (Exception ex) {
			tx.rollback();
			ex.printStackTrace();
		} finally {
			session.close();
		}
	}

	public static List<Content> printParaCount(String document) {
		List<Content> contentList = new ArrayList<Content>();
		String lineBreakCharacters = "\r\n";
		StringTokenizer st = new StringTokenizer(document, lineBreakCharacters);
		// System.out.println("ParaCount: " + st.countTokens());
		while (st.hasMoreTokens()) {
			Content ct = new Content();
			ct.setNumber(contentList.size());
			ct.setContent(st.nextToken());
			contentList.add(ct);
			// System.out.println(ct.getContent());
		}

		return contentList;
	}

	public static String readFile(File myfile) {
		// Read the file into a string buffer, then return as a string.
		StringBuffer buf = null;// the intermediary, mutable buffer
		BufferedReader breader = null;// reader for the template files
		try {
			breader = new BufferedReader(new InputStreamReader(
					new FileInputStream((myfile)), Charset.forName("utf-8")));
			// breader = new BufferedReader(new
			// FileReader(strFileName));//header
			// java.net.URL url
			// =session.getServletContext().getResource("/rates.txt");
			// breader =new BufferedReader(new
			// InputStreamReader(url.openStream()));
			buf = new StringBuffer();
			while (breader.ready()) {
				buf.append((char) breader.read());
			}
			breader.close();
		}// try
		catch (Exception e) {
			e.printStackTrace();
		}// catch
		return buf.toString();
	}

	/**
	 * @return the myfile
	 */
	public File getMyfile() {
		return myfile;
	}

	/**
	 * @param myfile
	 *            the myfile to set
	 */
	public void setMyfile(File myfile) {
		this.myfile = myfile;
	}

	/**
	 * @return the myfileFileName
	 */
	public String getMyfileFileName() {
		return myfileFileName;
	}

	/**
	 * @param myfileFileName
	 *            the myfileFileName to set
	 */
	public void setMyfileFileName(String myfileFileName) {
		this.myfileFileName = myfileFileName;
	}

}
