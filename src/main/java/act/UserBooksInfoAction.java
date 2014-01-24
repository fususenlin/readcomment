/**
 * @filename Login.java
 * @author maosheng
 * @ctreateTime 下午12:57:36
 */
package act;

import java.util.ArrayList;
import java.util.List;


import org.hibernate.Session;
import org.hibernate.Transaction;

import session.HibernateSessionFactory;

import com.opensymphony.xwork2.ActionSupport;

import dao.BooksInfo;
import dao.BooksInfoDAO;
import dao.UserbooksInfo;
import dao.UserbooksInfoDAO;

/**
 * @author maosheng
 *
 */

public class UserBooksInfoAction extends ActionSupport {

    private String username;
    private List<BooksInfo> bookList;
   
    /**
     * 
     */
    
    public String execute() {
        
        Session session = HibernateSessionFactory.getSession(); 
        Transaction tx = session.beginTransaction(); 
        try {
            UserbooksInfoDAO ubdao = new UserbooksInfoDAO();
            BooksInfoDAO bdao = new BooksInfoDAO();
            List<UserbooksInfo> ubinfos = ubdao.findByProperty("username", username);
            bookList = new ArrayList<BooksInfo>();
            for(UserbooksInfo ub : ubinfos) {
                BooksInfo e = bdao.findById(ub.getBooksId());
                bookList.add(e);
            }
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
     * @return the username
     */
    public String getUsername() {
        return username;
    }

    /**
     * @param username the username to set
     */
    public void setUsername(String username) {
        this.username = username;
    }

    /**
     * @return the bookList
     */
    public List<BooksInfo> getBookList() {
        return bookList;
    }

    /**
     * @param bookList the bookList to set
     */
    public void setBookList(List<BooksInfo> bookList) {
        this.bookList = bookList;
    }

}
