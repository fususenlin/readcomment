package dao;
// default package

import java.sql.Time;


/**
 * BooksInfo entity. @author MyEclipse Persistence Tools
 */

public class BooksInfo  implements java.io.Serializable {


    // Fields    

     private Integer id;
     private String name;
     private Time createTime;
     private String createUser;
     private Integer paragraphCount;


    // Constructors

    /** default constructor */
    public BooksInfo() {
    }

	/** minimal constructor */
    public BooksInfo(String name) {
        this.name = name;
    }
    
    /** full constructor */
    public BooksInfo(String name, Time createTime, String createUser, Integer paragraphCount) {
        this.name = name;
        this.createTime = createTime;
        this.createUser = createUser;
        this.paragraphCount = paragraphCount;
    }

   
    // Property accessors

    public Integer getId() {
        return this.id;
    }
    
    public void setId(Integer id) {
        this.id = id;
    }

    public String getName() {
        return this.name;
    }
    
    public void setName(String name) {
        this.name = name;
    }

    public Time getCreateTime() {
        return this.createTime;
    }
    
    public void setCreateTime(Time createTime) {
        this.createTime = createTime;
    }

    public String getCreateUser() {
        return this.createUser;
    }
    
    public void setCreateUser(String createUser) {
        this.createUser = createUser;
    }

    public Integer getParagraphCount() {
        return this.paragraphCount;
    }
    
    public void setParagraphCount(Integer paragraphCount) {
        this.paragraphCount = paragraphCount;
    }
   








}