import React from 'react';
import {Pagination} from "react-bootstrap";
import {LinkContainer} from "react-router-bootstrap";

const Paginate = ({pages, page, keyword = '', isAdmin = false}) => {

    if (keyword) {
        keyword = keyword.split('?keyword=')[1].split('&')[0]
    }

    return (pages > 1 && (
            <Pagination>
                {/*<Pagination.First/>*/}
                {/*<Pagination.Prev/>*/}
                {[...Array(pages).keys()].map(x => (
                    <LinkContainer
                        key={x + 1}
                        to={{search: `keyword=${keyword}&page=${x + 1}`}}
                    >
                        <Pagination.Item active={x + 1 === page}>{x + 1}</Pagination.Item>
                    </LinkContainer>
                ))}
                {/*<Pagination.Next/>*/}
                {/*<Pagination.Last/>*/}
            </Pagination>
        )
    );
};

export default Paginate;