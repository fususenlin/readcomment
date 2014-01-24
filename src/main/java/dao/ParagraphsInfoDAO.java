package dao;

// default package

import java.util.List;
import org.hibernate.LockMode;
import org.hibernate.Query;
import org.hibernate.criterion.Example;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

/**
 * A data access object (DAO) providing persistence and search support for
 * ParagraphsInfo entities. Transaction control of the save(), update() and
 * delete() operations can directly support Spring container-managed
 * transactions or they can be augmented to handle user-managed Spring
 * transactions. Each of these methods provides additional information for how
 * to configure it for the desired type of transaction control.
 * 
 * @see .ParagraphsInfo
 * @author MyEclipse Persistence Tools
 */

public class ParagraphsInfoDAO extends BaseHibernateDAO {
    private static final Logger log = LoggerFactory
            .getLogger(ParagraphsInfoDAO.class);
    // property constants
    public static final String BOOK_ID = "bookId";
    public static final String CONTENT = "content";
    public static final String COMMENT_COUNT = "commentCount";

    public void save(ParagraphsInfo transientInstance) throws Exception {
        log.debug("saving ParagraphsInfo instance");
        try {
            getSession().save(transientInstance);
            log.debug("save successful");
        } catch (RuntimeException re) {
            log.error("save failed", re);
            throw re;
        }
    }

    public void delete(ParagraphsInfo persistentInstance) throws Exception {
        log.debug("deleting ParagraphsInfo instance");
        try {
            getSession().delete(persistentInstance);
            log.debug("delete successful");
        } catch (RuntimeException re) {
            log.error("delete failed", re);
            throw re;
        }
    }

    public ParagraphsInfo findById(java.lang.Integer id) throws Exception {
        log.debug("getting ParagraphsInfo instance with id: " + id);
        try {
            ParagraphsInfo instance = (ParagraphsInfo) getSession().get(
                    ParagraphsInfo.class, id);
            return instance;
        } catch (RuntimeException re) {
            log.error("get failed", re);
            throw re;
        }
    }

    public List findByExample(ParagraphsInfo instance) throws Exception {
        log.debug("finding ParagraphsInfo instance by example");
        try {
            List results = getSession().createCriteria(ParagraphsInfo.class)
                    .add(Example.create(instance)).list();
            log.debug("find by example successful, result size: "
                    + results.size());
            return results;
        } catch (RuntimeException re) {
            log.error("find by example failed", re);
            throw re;
        }
    }

    public List findByProperty(String propertyName, Object value,
            int firstResult, int maxResult) throws Exception {
        log.debug("finding ParagraphsInfo instance with property: "
                + propertyName + ", value: " + value);
        try {
            String queryString = "from ParagraphsInfo as model where model."
                    + propertyName + "= ?";
            Query queryObject = getSession().createQuery(queryString);
            queryObject.setFirstResult(firstResult);
            queryObject.setMaxResults(maxResult);
            queryObject.setParameter(0, value);
            return queryObject.list();
        } catch (RuntimeException re) {
            log.error("find by property name failed", re);
            throw re;
        }
    }

    public List findByProperty(String propertyName, Object value)
            throws Exception {
        log.debug("finding ParagraphsInfo instance with property: "
                + propertyName + ", value: " + value);
        try {
            String queryString = "from ParagraphsInfo as model where model."
                    + propertyName + "= ?";
            Query queryObject = getSession().createQuery(queryString);
            queryObject.setParameter(0, value);
            return queryObject.list();
        } catch (RuntimeException re) {
            log.error("find by property name failed", re);
            throw re;
        }
    }

    public List findByBookId(Object bookId, int firstResult, int maxResult) throws Exception {
        return findByProperty(BOOK_ID, bookId, firstResult, maxResult);
    }

    public List findByBookId(Object bookId) throws Exception {
        return findByProperty(BOOK_ID, bookId);
    }

    public List findByContent(Object content) throws Exception {
        return findByProperty(CONTENT, content);
    }

    public List findByCommentCount(Object commentCount) throws Exception {
        return findByProperty(COMMENT_COUNT, commentCount);
    }

    public List findAll() throws Exception {
        log.debug("finding all ParagraphsInfo instances");
        try {
            String queryString = "from ParagraphsInfo";
            Query queryObject = getSession().createQuery(queryString);
            return queryObject.list();
        } catch (RuntimeException re) {
            log.error("find all failed", re);
            throw re;
        }
    }

    public ParagraphsInfo merge(ParagraphsInfo detachedInstance)
            throws Exception {
        log.debug("merging ParagraphsInfo instance");
        try {
            ParagraphsInfo result = (ParagraphsInfo) getSession().merge(
                    detachedInstance);
            log.debug("merge successful");
            return result;
        } catch (RuntimeException re) {
            log.error("merge failed", re);
            throw re;
        }
    }

    public void attachDirty(ParagraphsInfo instance) throws Exception {
        log.debug("attaching dirty ParagraphsInfo instance");
        try {
            getSession().saveOrUpdate(instance);
            log.debug("attach successful");
        } catch (RuntimeException re) {
            log.error("attach failed", re);
            throw re;
        }
    }

    public void attachClean(ParagraphsInfo instance) throws Exception {
        log.debug("attaching clean ParagraphsInfo instance");
        try {
            getSession().lock(instance, LockMode.NONE);
            log.debug("attach successful");
        } catch (RuntimeException re) {
            log.error("attach failed", re);
            throw re;
        }
    }
}