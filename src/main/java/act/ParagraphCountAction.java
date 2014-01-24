/**
 * @filename ParagraphList.java
 * @author maosheng
 * @ctreateTime 下午12:57:36
 */
package act;

import org.hibernate.Session;
import org.hibernate.Transaction;

import session.HibernateSessionFactory;

import com.opensymphony.xwork2.ActionSupport;

import dao.BooksInfo;
import dao.BooksInfoDAO;

/**
 * @author maosheng
 *
 */

public class ParagraphCountAction extends ActionSupport {

    private int number;
    private int count;
   
    /**
     * 
     */
    
    public String execute() {
        Session session = HibernateSessionFactory.getSession(); 
        Transaction tx = session.beginTransaction();  
        try {
            BooksInfoDAO bdao = new BooksInfoDAO();
            BooksInfo binfo = bdao.findById(number);
            count = binfo.getParagraphCount();
            tx.commit();
        } catch (Exception e) {
            tx.rollback(); 
            e.printStackTrace();
        }finally{
            session.close(); 
        }
        return SUCCESS;
    }
  
    /**
     * @return the number
     */
    public int getNumber() {
        return number;
    }
    /**
     * @param number the number to set
     */
    public void setNumber(int number) {
        this.number = number;
    }
   
    /**
     * @return the count
     */
    public int getCount() {
        return count;
    }
    /**
     * @param count the count to set
     */
    public void setCount(int count) {
        this.count = count;
    }
    
}
