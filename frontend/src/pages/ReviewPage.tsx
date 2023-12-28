import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import StarRating from "../components/reviewpage/StarRating";
import StyleSelect from "../components/reviewpage/StyleSelect";
import SizeReviewSelect from "../components/reviewpage/SizeReviewSelect";
import ReviewTextField from "../components/reviewpage/ReviewTextField";
import HeightInputField from "../components/reviewpage/HeightInputField";
import WeightInputField from "../components/reviewpage/WeightInputField";
import { Button } from "@mui/material";

export default function ReviewPage () {
    return (
        <div>
            <StarRating />
            <HeightInputField />
            <WeightInputField />
            <StyleSelect />
            <SizeReviewSelect />
            <ReviewTextField />
            <Button variant="contained">送出</Button>
            <Button variant="contained">取消</Button>
        </div>
    );
}