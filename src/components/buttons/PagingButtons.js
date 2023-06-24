import React, {useContext} from 'react';
import Button from "./Button";
import {IconContext} from "../../context/IconContext";

function PagingButtons({next, previous, getPageSize, getPageNo, setEndpoint}) {
    const {ico_prev, ico_next} = useContext(IconContext);

    return (
        <div className="button-wrapper paging">
            <Button
                variant="primary"
                iconLeft={ico_prev}
                isDisabled={!previous}
                onClick={() => {
                    const pageNo = getPageNo + 1;
                    setEndpoint = `http://localhost:8080/tasks/pages?pageNo=${pageNo}&pageSize=${getPageSize}`
                }}>
                Vorige
            </Button>
            <Button variant="primary" iconRight={ico_next} isDisabled={!next}>Volgende</Button>
        </div>
    );
}

export default PagingButtons;