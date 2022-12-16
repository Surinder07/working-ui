import { ChevronLeft, ChevronRight } from '@mui/icons-material';
import { useEffect, useState } from 'react';
import { PaginationStyles } from '../../styles/elements';

/**
 * 
 * @param {*} props (totalEntries, entryPerPage, currentPageEntries, pageNo, setPageNo)
 */
const Pagination = (props) => {

    const [entryRange, setEntryRange] = useState({
        start: 0,
        end: 0
    })

    const prevoiusPage = () => {
        if (props.pageNo !== 1) {
            props.setPageNo(props.pageNo - 1);
        }
    }

    const nextPage = () => {
        if (props.pageNo !== props.totalPages) {
            props.setPageNo(props.pageNo + 1);
        }
    }

    const changePage = (e) => {
        if (e.target.value != props.pageNo) {
            props.setPageNo(Number(e.target.value));
        }
    }

    useEffect(() => {
        setEntryRange({
            start: ((props.pageNo - 1) * props.entryPerPage) + 1,
            end: ((props.pageNo - 1) * props.entryPerPage) + props.currentPageEntries
        })
    }, [props.currentPageEntries, props.entryPerPage])

    return (
        <div className={PaginationStyles.container}>
            <div className={PaginationStyles.leftContainer}>
                <p>Showing {entryRange.start}-{entryRange.end} out of {props.totalEntries} entries</p>
            </div>
            <div className={PaginationStyles.rightContainer}>
                <button
                    style={{ marginRight: '5px' }}
                    className={`${PaginationStyles.navigationButton} ${PaginationStyles.button} ${props.pageNo === 1 && PaginationStyles.navigationDisabled}`}
                    onClick={prevoiusPage}
                ><ChevronLeft /></button>
                {
                    props.totalPages <= 5 ?
                        Array.apply(null, { length: props.totalPages }).map((e, i) => {
                            return <button
                                key={`num${i}`}
                                value={i + 1}
                                className={`${PaginationStyles.numberButton} ${PaginationStyles.button} ${(props.pageNo === i + 1) && PaginationStyles.numberActiveButton}`}
                                onClick={(e) => changePage(e, i)}
                            >{i + 1}</button>
                        }) :
                        <>
                            <button
                                className={`${PaginationStyles.numberButton} ${PaginationStyles.button} ${(props.pageNo === 1) && PaginationStyles.numberActiveButton}`}
                                onClick={() => props.setPageNo(1)}
                            >1</button>
                            {
                                props.pageNo === 1 || props.pageNo === 2 || props.pageNo === props.totalPages ?
                                    <button
                                        className={`${PaginationStyles.numberButton} ${PaginationStyles.button} ${(props.pageNo === 2) && PaginationStyles.numberActiveButton}`}
                                        onClick={() => props.setPageNo(2)}
                                    >2</button> :
                                    <button className={`${PaginationStyles.numberButton} ${PaginationStyles.button}`}>...</button>
                            }
                            {
                                props.pageNo > 2 && props.pageNo < props.totalPages - 1 ?
                                    <button
                                        className={`${PaginationStyles.numberButton} ${PaginationStyles.button} ${PaginationStyles.numberActiveButton}`}
                                    >{props.pageNo}</button> : props.pageNo === 2 ?
                                        <button
                                            className={`${PaginationStyles.numberButton} ${PaginationStyles.button} ${(props.pageNo === 3) && PaginationStyles.numberActiveButton}`}
                                            onClick={() => props.setPageNo(3)}
                                        >3</button> : props.pageNo === props.totalPages - 1 ?
                                            <button
                                                className={`${PaginationStyles.numberButton} ${PaginationStyles.button} ${(props.pageNo === props.totalPages - 2) && PaginationStyles.numberActiveButton}`}
                                                onClick={() => props.setPageNo(props.totalPages - 2)}
                                            >{props.totalPages - 2}</button> :
                                            <button className={`${PaginationStyles.numberButton} ${PaginationStyles.button}`}>...</button>
                            }
                            {
                                props.pageNo === props.totalPages || props.pageNo === props.totalPages - 1 || props.pageNo === 1 ?
                                    <button
                                        className={`${PaginationStyles.numberButton} ${PaginationStyles.button} ${(props.pageNo === props.totalPages - 1) && PaginationStyles.numberActiveButton}`}
                                        onClick={() => props.setPageNo(props.totalPages - 1)}
                                    >{props.totalPages - 1}</button> :
                                    <button className={`${PaginationStyles.numberButton} ${PaginationStyles.button}`}>...</button>
                            }
                            <button
                                className={`${PaginationStyles.numberButton} ${PaginationStyles.button} ${(props.pageNo === props.totalPages) && PaginationStyles.numberActiveButton}`}
                                onClick={() => props.setPageNo(props.totalPages)}
                            >{props.totalPages}</button>
                        </>
                }
                <button
                    style={{ marginLeft: '5px' }}
                    className={`${PaginationStyles.navigationButton} ${PaginationStyles.button} ${props.pageNo === props.totalPages && PaginationStyles.navigationDisabled}`}
                    onClick={nextPage}
                ><ChevronRight /></button>
            </div>
        </div>
    )
}

export default Pagination;