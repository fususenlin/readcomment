package dao;
// default package

import java.sql.Time;


/**
 * CommentsInfo entity. @author MyEclipse Persistence Tools
 */

public class CommentsInfo  implements java.io.Serializable {


    // Fields    

     private Integer id;
     private Integer booksId;
     private Integer paragraphId;
     private String content;
     private String createUser;
     private Time createTime;


    // Constructors

    /** default constructor */
    public CommentsInfo() {
    }

    
    /** full constructor */
    public CommentsInfo(Integer booksId, Integer paragraphId, String content, String createUser, Time createTime) {
        this.booksId = booksId;
        this.paragraphId = paragraphId;
        this.content = content;
        this.createUser = createUser;
        this.createTime = createTime;
    }

   
    // Property accessors

    public Integer getId() {
        return this.id;
    }
    
    public void setId(Integer id) {
        this.id = id;
    }

    public Integer getBooksId() {
        return this.booksId;
    }
    
    public void setBooksId(Integer booksId) {
        this.booksId = booksId;
    }

    public Integer getParagraphId() {
        return this.paragraphId;
    }
    
    public void setParagraphId(Integer paragraphId) {
        this.paragraphId = paragraphId;
    }

    public String getContent() {
        return this.content;
    }
    
    public void setContent(String content) {
        this.content = content;
    }

    public String getCreateUser() {
        return this.createUser;
    }
    
    public void setCreateUser(String createUser) {
        this.createUser = createUser;
    }

    public Time getCreateTime() {
        return this.createTime;
    }
    
    public void setCreateTime(Time createTime) {
        this.createTime = createTime;
    }
   








}