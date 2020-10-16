import React from 'react'
import { Helmet } from "react-helmet";

import { textStyles } from "shared/styles";
import styles from "./NotFoundPage.module.css";

function NotFoundPage() {
    return (
        <div className={`box-center ${styles["not-found"]}`}>
            <Helmet>
                <title>Nothing Here</title>
            </Helmet>
            <div>
                <h1
                    className={`${textStyles["text-main"]}`}
                >
                    There seems to be nothing here.
                </h1>
                <img
                    alt="Not Found"
                    src="https://media.giphy.com/media/a93jwI0wkWTQs/giphy.gif"
                />
            </div>
        </div>
    )
}

export default NotFoundPage;
