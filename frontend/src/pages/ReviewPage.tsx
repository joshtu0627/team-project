import React, { useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import StyleSelect from "../components/reviewpage/StyleSelect";
import SizeReviewSelect from "../components/reviewpage/SizeReviewSelect";
import ReviewTextField from "../components/reviewpage/ReviewTextField";
import HeightInputField from "../components/reviewpage/HeightInputField";
import WeightInputField from "../components/reviewpage/WeightInputField";
import ProductInfo from "../components/reviewpage/ProductInfo";
import AnonymousSwitch from "../components/reviewpage/AnonymousSwitch";
import Rating from '@mui/material/Rating';
import axios from "axios";
import { backendurl } from "../constants/urls";
import { parseCookies } from 'nookies';
import { Link } from "react-router-dom";
import Swal from 'sweetalert2';

export default function ReviewPage() {
    const [isAnonymous, setIsAnonymous] = React.useState(false);
    const [height, setHeight] = React.useState(-1);
    const [weight, setWeight] = React.useState(-1);
    const [style, setStyle] = React.useState('');
    const [sizeReview, setSizeReview] = React.useState('');
    const [reviewText, setReviewText] = React.useState('');
    const [star, setStar] = React.useState(-1);
    let { state } = useLocation();

    const handleSubmit = async () => {
        if (!height || !weight || !style || !sizeReview || !star) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: '請填寫完整資料',
            });
            return;
        }
        const { user_id } = parseCookies();
        const userId = parseInt(user_id);
        const private_value = isAnonymous ? 1 : 0;
        console.log("submit");
        console.log(height);
        const data = {
            is_private: private_value,
            star,
            height,
            weight,
            style,
            size_review: sizeReview,
            review: reviewText,
            date: new Date().toISOString().slice(0, 10),
            user_id: userId,
            product_id: state.productId,
            color_name: state.productColor,
            color_code: state.productColorCode,
            size: state.productSize,
        };
        console.log(data);
        const res = await axios.post(
            `${backendurl}/api/1.0/review/create`,
            data,
            { headers: { 'Content-Type': 'application/json' } }
        );
        const updateReviewStatusRes = await axios.post(
            `${backendurl}/api/1.0/order/update-review-status`,
            { order_id: state.orderId, product_id: state.productId },
            { headers: { 'Content-Type': 'application/json' } }
        )
        Swal.fire({
            icon: 'success',
            title: '成功',
            text: '評論已送出',
        }).then(() => {
            window.location.href = '/profile';
        });
    }

    return (
        <div className="flex flex-col bg-gray-200 p-4 w-7/12 items-center rounded-xl m-auto">
            
            <div className="flex flex-row gap-2 items-center bg-white p-4 rounded-xl w-full">
                <img src="/assets/images/icon-images/default-product-pic.png" alt="product image" className="h-20 w-20"/>
                <ProductInfo 
                    name={state.productName}
                    size={state.productSize}
                    color={state.productColor}
                />
                
            </div>
            <div className="bg-white p-2 flex justify-center rounded-xl mt-3 w-full">
                <Rating
                    name="size-medium"
                    defaultValue={0}
                    size='large'
                    onChange={(event, newValue) => {
                        setStar(newValue || -1);
                    }}
                />
            </div>
            <div className="flex flex-row items-center gap-1 my-2">
                <HeightInputField
                    height={height}
                    setHeight={setHeight}
                />
                <WeightInputField
                    weight={weight}
                    setWeight={setWeight}
                />
                <StyleSelect
                    style={style}
                    setStyle={setStyle}
                />
                <SizeReviewSelect
                    sizeReview={sizeReview}
                    setSizeReview={setSizeReview}
                />
                 <AnonymousSwitch
                    isAnonymous={isAnonymous}
                    setAnonymous={setIsAnonymous}
                />
                
            </div>
            
            <ReviewTextField
                reviewText={reviewText}
                setReviewText={setReviewText}
            />
            <div className="flex flex-row gap-2 mt-4">
                <button
                    className="bg-yellow-400 px-4 py-2 rounded-3xl font-semibold hover:bg-yellow-500"
                    onClick={handleSubmit}
                >
                    送出
                </button>
                <button
                    className="bg-white px-4 py-2 rounded-3xl font-semibold hover:bg-gray-100"
                >
                    <Link
                        to="/profile"
                    >
                    取消
                    </Link>
                </button>
            </div>
        </div>
    );
}

function parseIntparseCookies(): { user_id: any; } {
    throw new Error("Function not implemented.");
}
