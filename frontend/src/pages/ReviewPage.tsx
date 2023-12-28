import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import StarRating from "../components/profilepage/StarRating";
import StyleSelect from "../components/profilepage/StyleSelect";
import SizeReviewSelect from "../components/profilepage/SizeReviewSelect";
import ReviewTextField from "../components/profilepage/ReviewTextField";
import HeightInputField from "../components/profilepage/HeightInputField";
import WeightInputField from "../components/profilepage/WeightInputField";
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