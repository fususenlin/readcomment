package dao;
// default package

import java.sql.Time;
import java.util.List;
import org.hibernate.LockMode;
import org.hibernate.Query;
import org.hibernate.criterion.Example;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

/**
 	* A data access object (DAO) providing persistence and search support for CommentsInfo entities.
 			* Transaction control of the save(), update() and delete() operations 
		can directly support Spring container-managed transactions or they can be augmented	to handle user-managed Spring transactions. 
		Each of these methods provides additional information for how to configure it for the desired type of transaction control. 	
	 * @see .CommentsInfo
  * @author MyEclipse Persistence Tools 
 */

public class CommentsInfoDAO extends BaseHibernateDAO  {
	     private static final Logger log = LoggerFactory.getLogger(CommentsInfoDAO.class);
		//property constants
	public static final String BOOKS_ID = "booksId";
	public static final String PARAGRAPH_ID = "paragraphId";
	public static final String CONTENT = "content";
	public static final String CREATE_USER = "createUser";



    
    public void save(CommentsInfo transientInstance) {
        log.debug("saving CommentsInfo instance");
        try {
            getSession().save(transientInstance);
            log.debug("save successful");
        } catch (RuntimeException re) {
            log.error("save failed", re);
            throw re;
        }
    }
    
	public void delete(CommentsInfo persistentInstance) {
        log.debug("deleting CommentsInfo instance");
        try {
            getSession().delete(persistentInstance);
            log.debug("delete successful");
        } catch (RuntimeException re) {
            log.error("delete failed", re);
            throw re;
        }
    }
    
    public CommentsInfo findById( java.lang.Integer id) {
        log.debug("getting CommentsInfo instance with id: " + id);
        try {
            CommentsInfo instance = (CommentsInfo) getSession()
                    .get(CommentsInfo.class, id);
            return instance;
        } catch (RuntimeException re) {
            log.error("get failed", re);
            throw re;
        }
    }
    
    
    public List findByExample(CommentsInfo instance) {
        log.debug("finding CommentsInfo instance by example");
        try {
            List results = getSession()
                    .createCriteria(CommentsInfo.class)
                    .add(Example.create(instance))
            .list();
            log.debug("find by example successful, result size: " + results.size());
            return results;
        } catch (RuntimeException re) {
            log.error("find by example failed", re);
            throw re;
        }
    }    
    
    public List findByProperty(String propertyName, Object value) {
      log.debug("finding CommentsInfo instance with property: " + propertyName
            + ", value: " + value);
      try {
         String queryString = "from CommentsInfo as model where model." 
         						+ propertyName + "= ?";
         Query queryObject = getSession().createQuery(queryString);
		 queryObject.setParameter(0, value);
		 return queryObject.list();
      } catch (RuntimeException re) {
         log.error("find by property name failed", re);
         throw re;
      }
	}

	public List findByBooksId(Object booksId
	) {
		return findByProperty(BOOKS_ID, booksId
		);
	}
	
	public List findByParagraphId(Object paragraphId
	) {
		return findByProperty(PARAGRAPH_ID, paragraphId
		);
	}
	
	public List findByContent(Object content
	) {
		return findByProperty(CONTENT, content
		);
	}
	
	public List findByCreateUser(Object createUser
	) {
		return findByProperty(CREATE_USER, createUser
		);
	}
	

	public List findAll() {
		log.debug("finding all CommentsInfo instances");
		try {
			String queryString = "from CommentsInfo";
	         Query queryObject = getSession().createQuery(queryString);
			 return queryObject.list();
		} catch (RuntimeException re) {
			log.error("find all failed", re);
			throw re;
		}
	}
	
    public CommentsInfo merge(CommentsInfo detachedInstance) {
        log.debug("merging CommentsInfo instance");
        try {
            CommentsInfo result = (CommentsInfo) getSession()
                    .merge(detachedInstance);
            log.debug("merge successful");
            return result;
        } catch (RuntimeException re) {
            log.error("merge failed", re);
            throw re;
        }
    }

    public void attachDirty(CommentsInfo instance) {
        log.debug("attaching dirty CommentsInfo instance");
        try {
            getSession().saveOrUpdate(instance);
            log.debug("attach successful");
        } catch (RuntimeException re) {
            log.error("attach failed", re);
            throw re;
        }
    }
    
    public void attachClean(CommentsInfo instance) {
        log.debug("attaching clean CommentsInfo instance");
        try {
            getSession().lock(instance, LockMode.NONE);
            log.debug("attach successful");
        } catch (RuntimeException re) {
            log.error("attach failed", re);
            throw re;
        }
    }
}