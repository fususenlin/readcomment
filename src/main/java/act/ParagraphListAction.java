/**
 * @filename ParagraphList.java
 * @author maosheng
 * @ctreateTime 下午12:57:36
 */
package act;

import java.util.List;

import org.hibernate.Session;
import org.hibernate.Transaction;

import session.HibernateSessionFactory;

import main.Content;
import com.opensymphony.xwork2.ActionSupport;

import dao.BooksInfoDAO;
import dao.ParagraphsInfo;
import dao.ParagraphsInfoDAO;

/**
 * @author maosheng
 * 
 */
public class ParagraphListAction extends ActionSupport {

	private int number;
	private List<ParagraphsInfo> contentList;
	private int firstResult;
	private int maxResult;

	/**
     * 
     */
	public String execute() {
		Session session = HibernateSessionFactory.getSession();
		Transaction tx = session.beginTransaction();
		try {
			ParagraphsInfoDAO pdao = new ParagraphsInfoDAO();
			contentList = pdao.findByBookId(number, firstResult, maxResult);
			tx.commit();
		} catch (Exception e) {
			tx.rollback();
			e.printStackTrace();
		} finally {
			session.close();
		}
		return SUCCESS;
	}

	/**
	 * @return the firstResult
	 */
	public int getFirstResult() {
		return firstResult;
	}

	/**
	 * @param firstResult
	 *            the firstResult to set
	 */
	public void setFirstResult(int firstResult) {
		this.firstResult = firstResult;
	}

	/**
	 * @return the maxResult
	 */
	public int getMaxResult() {
		return maxResult;
	}

	/**
	 * @param maxResult
	 *            the maxResult to set
	 */
	public void setMaxResult(int maxResult) {
		this.maxResult = maxResult;
	}

	/**
	 * @return the number
	 */
	public int getNumber() {
		return number;
	}

	/**
	 * @param number
	 *            the number to set
	 */
	public void setNumber(int number) {
		this.number = number;
	}

	/**
	 * @return the contentList
	 */
	public List<ParagraphsInfo> getContentList() {
		return contentList;
	}

	/**
	 * @param contentList
	 *            the contentList to set
	 */
	public void setContentList(List<ParagraphsInfo> contentList) {
		this.contentList = contentList;
	}
}
