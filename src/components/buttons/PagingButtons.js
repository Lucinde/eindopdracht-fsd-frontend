import React, {useContext} from 'react';
import Button from "./Button";
import {IconContext} from "../../context/IconContext";

function PagingButtons({next, previous, onClickPrev, onClickNext}) {
    const {ico_prev, ico_next} = useContext(IconContext);

    return (
        <div className="button-wrapper paging">
            <Button
                variant="primary"
                iconLeft={ico_prev}
                isDisabled={!previous}
                handleClick={onClickPrev}
                >
                Vorige
            </Button>
            <Button
                variant="primary"
                iconRight={ico_next}
                isDisabled={!next}
                handleClick={onClickNext}
            >
                Volgende
            </Button>
        </div>
    );
}

export default PagingButtons;