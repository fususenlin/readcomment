/**
 * @filename Login.java
 * @author maosheng
 * @ctreateTime 下午12:57:36
 */
package act;

import org.hibernate.Session;
import org.hibernate.Transaction;

import session.HibernateSessionFactory;

import com.opensymphony.xwork2.ActionSupport;

import dao.UsersInfo;
import dao.UsersInfoDAO;
import dao.UsersInfoId;

/**
 * @author maosheng
 *
 */

public class LoginAction extends ActionSupport {

    private String username;
    private String password;
    private UsersInfo user;
   
    /**
     * 
     */
    
    public String execute() {
        
        Session session = HibernateSessionFactory.getSession(); 
        Transaction tx = session.beginTransaction(); 
        try {
            UsersInfoDAO uidao = new UsersInfoDAO();
            UsersInfoId usersInfoid = new UsersInfoId(username,username);
            user = uidao.findById(usersInfoid);
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
     * @return the password
     */
    public String getPassword() {
        return password;
    }

    /**
     * @param password the password to set
     */
    public void setPassword(String password) {
        this.password = password;
    }

    /**
     * @return the user
     */
    public UsersInfo getUser() {
        return user;
    }

    /**
     * @param user the user to set
     */
    public void setUser(UsersInfo user) {
        this.user = user;
    }
  
    
}
