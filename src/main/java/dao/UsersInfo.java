package dao;
// default package



/**
 * UsersInfo entity. @author MyEclipse Persistence Tools
 */

public class UsersInfo  implements java.io.Serializable {


    // Fields    

     private UsersInfoId id;
     private String img;


    // Constructors

    /** default constructor */
    public UsersInfo() {
    }

	/** minimal constructor */
    public UsersInfo(UsersInfoId id) {
        this.id = id;
    }
    
    /** full constructor */
    public UsersInfo(UsersInfoId id, String img) {
        this.id = id;
        this.img = img;
    }

   
    // Property accessors

    public UsersInfoId getId() {
        return this.id;
    }
    
    public void setId(UsersInfoId id) {
        this.id = id;
    }

    public String getImg() {
        return this.img;
    }
    
    public void setImg(String img) {
        this.img = img;
    }
   








}