package dao;
// default package



/**
 * ParagraphsInfo entity. @author MyEclipse Persistence Tools
 */

public class ParagraphsInfo  implements java.io.Serializable {


    // Fields    

     private Integer id;
     private Integer bookId;
     private String content;
     private Integer commentCount;


    // Constructors

    /** default constructor */
    public ParagraphsInfo() {
    }

    
    /** full constructor */
    public ParagraphsInfo(Integer bookId, String content, Integer commentCount) {
        this.bookId = bookId;
        this.content = content;
        this.commentCount = commentCount;
    }

   
    // Property accessors

    public Integer getId() {
        return this.id;
    }
    
    public void setId(Integer id) {
        this.id = id;
    }

    public Integer getBookId() {
        return this.bookId;
    }
    
    public void setBookId(Integer bookId) {
        this.bookId = bookId;
    }

    public String getContent() {
        return this.content;
    }
    
    public void setContent(String content) {
        this.content = content;
    }

    public Integer getCommentCount() {
        return this.commentCount;
    }
    
    public void setCommentCount(Integer commentCount) {
        this.commentCount = commentCount;
    }
   








}