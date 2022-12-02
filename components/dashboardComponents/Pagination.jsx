import { ChevronLeft, ChevronRight } from '@mui/icons-material';
import { useEffect, useState } from 'react';
import styles from '../../styles/elements/Pagination.module.css';

/**
 * 
 * @param {*} props (totalEntries, entryPerPage, currentPageEntries, pageNo, setPageNo)
 */
const Pagination = (props) => {

    const [totalPages, setTotalPages] = useState(1);
    const [entryRange, setEntryRange] = useState({
        start: 0,
        end: 0
    })

    const calculateTotalPages = (totalEntries, entryPerPage) => {
        if (totalEntries % entryPerPage === 0) return Math.floor(totalEntries / entryPerPage);
        else return Math.floor(totalEntries / entryPerPage) + 1;
    }

    const prevoiusPage = () => {
        if (props.pageNo !== 1) {
            props.setPageNo(props.pageNo - 1);
        }
    }

    const nextPage = () => {
        if (props.pageNo !== totalPages) {
            props.setPageNo(props.pageNo + 1);
        }
    }

    const changePage = (e) => {
        if (e.target.value != props.pageNo) {
            props.setPageNo(Number(e.target.value));
        }
    }

    useEffect(() => {
        setTotalPages(calculateTotalPages(props.totalEntries, props.entryPerPage))
        setEntryRange({
            start: ((props.pageNo - 1) * props.entryPerPage) + 1,
            end: ((props.pageNo - 1) * props.entryPerPage) + props.currentPageEntries
        })
    }, [props.entryPerPage])

    return (
        <div className={styles.container}>
            <div className={styles.leftContainer}>
                <p>Showing {entryRange.start}-{entryRange.end} out of {props.totalEntries} entries</p>
            </div>
            <div className={styles.rightContainer}>
                <button
                    style={{ marginRight: '5px' }}
                    className={`${styles.navigationButton} ${styles.button} ${props.pageNo === 1 && styles.navigationDisabled}`}
                    onClick={prevoiusPage}
                ><ChevronLeft /></button>
                {
                    totalPages <= 5 ?
                        Array.apply(null, { length: totalPages }).map((e, i) => {
                            return <button
                                key={`num${i}`}
                                value={i + 1}
                                className={`${styles.numberButton} ${styles.button} ${(props.pageNo === i + 1) && styles.numberActiveButton}`}
                                onClick={(e) => changePage(e, i)}
                            >{i + 1}</button>
                        }) :
                        <>
                            <button
                                className={`${styles.numberButton} ${styles.button} ${(props.pageNo === 1) && styles.numberActiveButton}`}
                                onClick={() => props.setPageNo(1)}
                            >1</button>
                            {
                                props.pageNo === 1 || props.pageNo === 2 || props.pageNo === totalPages ?
                                    <button
                                        className={`${styles.numberButton} ${styles.button} ${(props.pageNo === 2) && styles.numberActiveButton}`}
                                        onClick={() => props.setPageNo(2)}
                                    >2</button> :
                                    <button className={`${styles.numberButton} ${styles.button}`}>...</button>
                            }
                            {
                                props.pageNo > 2 && props.pageNo < totalPages - 1 ?
                                    <button
                                        className={`${styles.numberButton} ${styles.button} ${styles.numberActiveButton}`}
                                    >{props.pageNo}</button> : props.pageNo === 2 ?
                                        <button
                                            className={`${styles.numberButton} ${styles.button} ${(props.pageNo === 3) && styles.numberActiveButton}`}
                                            onClick={() => props.setPageNo(3)}
                                        >3</button> : props.pageNo === totalPages - 1 ?
                                            <button
                                                className={`${styles.numberButton} ${styles.button} ${(props.pageNo === totalPages - 2) && styles.numberActiveButton}`}
                                                onClick={() => props.setPageNo(totalPages - 2)}
                                            >{totalPages - 2}</button> :
                                            <button className={`${styles.numberButton} ${styles.button}`}>...</button>
                            }
                            {
                                props.pageNo === totalPages || props.pageNo === totalPages - 1 || props.pageNo === 1 ?
                                    <button
                                        className={`${styles.numberButton} ${styles.button} ${(props.pageNo === totalPages - 1) && styles.numberActiveButton}`}
                                        onClick={() => props.setPageNo(totalPages - 1)}
                                    >{totalPages - 1}</button> :
                                    <button className={`${styles.numberButton} ${styles.button}`}>...</button>
                            }
                            <button
                                className={`${styles.numberButton} ${styles.button} ${(props.pageNo === totalPages) && styles.numberActiveButton}`}
                                onClick={() => props.setPageNo(totalPages)}
                            >{totalPages}</button>
                        </>
                }
                <button
                    style={{ marginLeft: '5px' }}
                    className={`${styles.navigationButton} ${styles.button} ${props.pageNo === totalPages && styles.navigationDisabled}`}
                    onClick={nextPage}
                ><ChevronRight /></button>
            </div>
        </div>
    )
}

export default Pagination;