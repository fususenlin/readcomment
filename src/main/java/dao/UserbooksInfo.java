package dao;
// default package



/**
 * UserbooksInfo entity. @author MyEclipse Persistence Tools
 */

public class UserbooksInfo  implements java.io.Serializable {


    // Fields    

     private String username;
     private Integer booksId;


    // Constructors

    /** default constructor */
    public UserbooksInfo() {
    }

	/** minimal constructor */
    public UserbooksInfo(String username) {
        this.username = username;
    }
    
    /** full constructor */
    public UserbooksInfo(String username, Integer booksId) {
        this.username = username;
        this.booksId = booksId;
    }

   
    // Property accessors

    public String getUsername() {
        return this.username;
    }
    
    public void setUsername(String username) {
        this.username = username;
    }

    public Integer getBooksId() {
        return this.booksId;
    }
    
    public void setBooksId(Integer booksId) {
        this.booksId = booksId;
    }
   








}