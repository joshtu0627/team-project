// reviews can be fetched from backend
// the buttons don't work yet

import React, { useEffect } from "react";
import Rating from '@mui/material/Rating';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import axios from "axios";
import { backendurl } from "../../../constants/urls";
import PopupState, {
    bindTrigger,
    bindPopover,
    bindHover
} from "material-ui-popup-state";
import HoverPopover from "material-ui-popup-state/HoverPopover";
import Button from "@mui/material/Button";
import TotalRatings from "../TotalRatings";

interface FilterButtonProps {
  title: string;
  filter: string;
  setFilter: (filter: string) => void;
}

interface ReviewProps {
    id: number;
    is_private: number;
    star: number;
    height: number;
    weight: number;
    style: string;
    size_review: string;
    review: string;
    date: string;
    user_id: number;
    product_id: number;
    size: string;
    color_name: string;
    color_code: string;
    username: string;
    like: number;
    excited: number;
    love: number;
    dislike: number;
    angry: number;
    heartbroken: number;
}

interface EmojiButtonProps {
    // repEmoji: string;
    emoji1: string;
    emoji2: string;
    emoji3: string;
    emoji1_num: number;
    emoji2_num: number;
    emoji3_num: number;
    focusEmoji: string;
    setFocusEmoji: (emoji: string) => void;
}

const FilterButton: React.FC<FilterButtonProps> = ({ title, filter, setFilter }) => {
    return (
    <div>
        <button
            className={`border p-2 mx-5 my-2 rounded-3xl text-black font-semibold ${filter === title ? 'bg-yellow-400' : 'hover:bg-yellow-400'}`}
            onClick={() => setFilter(title)}
        >
            {title}
        </button>
    </div>
    );
};

const EmojiButton: React.FC<EmojiButtonProps> = (props) => {
    const { emoji1, emoji2, emoji3, emoji1_num, emoji2_num, emoji3_num, focusEmoji, setFocusEmoji } = props;
    const [emojiAnchorEl, setEmojiAnchorEl] = React.useState<HTMLElement | null>(null);
    const [numberAnchorEl, setNumberAnchorEl] = React.useState<HTMLElement | null>(null);
    const [repEmoji, setRepEmoji] = React.useState<string>(emoji1);
    const [emoji1Count, setEmoji1Count] = React.useState<number>(emoji1_num);
    const [emoji2Count, setEmoji2Count] = React.useState<number>(emoji2_num);
    const [emoji3Count, setEmoji3Count] = React.useState<number>(emoji3_num);

    const handleEmojiPopoverOpen = (event: React.MouseEvent<HTMLElement>) => {setEmojiAnchorEl(event.currentTarget);};
    const handleEmojiPopoverClose = () => {setEmojiAnchorEl(null);};
    const handleNumberPopoverOpen = (event: React.MouseEvent<HTMLElement>) => {setNumberAnchorEl(event.currentTarget);};
    const handleNumberPopoverClose = () => {setNumberAnchorEl(null);};

    const openEmoji = Boolean(emojiAnchorEl);
    const openNumber = Boolean(numberAnchorEl);

    const handleEmojiClicked = (emoji: string) => {
        if (focusEmoji === emoji) {
            setFocusEmoji('');
            setRepEmoji(emoji1)
            if (emoji === emoji1) {
                setEmoji1Count(emoji1Count - 1);
            } else if (emoji === emoji2) {
                setEmoji2Count(emoji2Count - 1);
            } else {
                setEmoji3Count(emoji3Count - 1);
            }
        } else {
            setFocusEmoji(emoji);
            setRepEmoji(emoji);
            if (emoji === emoji1) {
                setEmoji1Count(emoji1Count + 1);
            } else if (emoji === emoji2) {
                setEmoji2Count(emoji2Count + 1);
            } else {
                setEmoji3Count(emoji3Count + 1);
            }
        }
    }

    const handleRepEmojiClicked = (emoji: string) => {
        if (focusEmoji === emoji) {
            setFocusEmoji('');
            if (emoji === emoji1) {
                setEmoji1Count(emoji1Count - 1);
            } else if (emoji === emoji2) {
                setEmoji2Count(emoji2Count - 1);
            } else {
                setEmoji3Count(emoji3Count - 1);
            }
        } else {
            setFocusEmoji(emoji);
            if (emoji === emoji1) {
                setEmoji1Count(emoji1Count + 1);
            } else if (emoji === emoji2) {
                setEmoji2Count(emoji2Count + 1);
            } else {
                setEmoji3Count(emoji3Count + 1);
            }
        }
    }

    console.log(focusEmoji);

    return (
        <div className="flex flex-row items-center gap-1">
            <PopupState variant="popover" popupId="demo-popup-popover">
                {(popupState) => (
                    <div>
                        <button 
                            className={`text-4xl ${focusEmoji === repEmoji ? 'animate-bounce' : 'hover:animate-pulse'}`}
                            {...bindHover(popupState)}
                            onClick={() => handleRepEmojiClicked(repEmoji)}
                        >
                            {repEmoji}
                        </button>
                        <HoverPopover
                            {...bindPopover(popupState)}
                            anchorOrigin={{
                                vertical: "bottom",
                                horizontal: "center",
                            }}
                            transformOrigin={{
                                vertical: "top",
                                horizontal: "center"
                            }}
                        >
                            <button
                                className="text-2xl hover:bg-gray-400"
                                onClick={() => handleEmojiClicked(emoji1)}
                            >
                                {emoji1}
                            </button>
                            <button
                                className="text-2xl hover:bg-gray-400"
                                onClick={() => handleEmojiClicked(emoji2)}
                            >
                                {emoji2}
                            </button>
                            <button
                                className="text-2xl hover:bg-gray-400"
                                onClick={() => handleEmojiClicked(emoji3)}
                            >
                                {emoji3}
                            </button>
                        </HoverPopover>
                    </div>
                )}
            </PopupState>

            <Typography
                aria-owns={openNumber ? 'number-popover' : undefined}
                aria-haspopup="true"
                onMouseEnter={handleNumberPopoverOpen}
                onMouseLeave={handleNumberPopoverClose}
            >
                {emoji1Count + emoji2Count + emoji3Count}
            </Typography>
            <Popover
                id="number-popover"
                sx={{
                    pointerEvents: 'none',
                }}
                open={openNumber}
                anchorEl={numberAnchorEl}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                }}
                onClose={handleNumberPopoverClose}
                disableRestoreFocus
            >
                <p>{emoji1} {emoji1Count}</p>
                <p>{emoji2} {emoji2Count}</p>
                <p>{emoji3} {emoji3Count}</p>
            </Popover>
        </div>
    )
}

const Review: React.FC<ReviewProps> = (props) => {
    const [focusEmoji, setFocusEmoji] = React.useState<string>('');
    const {
        is_private,
        star,
        height,
        weight,
        style,
        size_review,
        review,
        date,
        user_id,
        product_id,
        size,
        color_name,
        color_code,
        username,
        like,
        excited,
        love,
        dislike,
        angry,
        heartbroken,
    } = props;

    return (
        <div className="border-t border-gray-300 p-6  mt-4">
            <div>
                <p className="font-semibold text-lg">{username}</p>
                <p className="font-medium text-gray-400 text-sm">{date}</p>
            </div>
            <div className="text-gray-500 mt-2 mb-2">
                <Rating name="read-only" value={star} readOnly size="large"/>
                <p>{height} cm ． {weight} kg ． {style}</p>
                <p>{color_name} ． {size} ． {size_review}</p>
            </div>
            <p className="mb-4 font-semibold">{review}</p>
            <div className="flex flex-row gap-2">
                <EmojiButton
                    emoji1="👍"
                    emoji2="🤩"
                    emoji3="❤️"
                    emoji1_num={like}
                    emoji2_num={excited}
                    emoji3_num={excited}
                    focusEmoji={focusEmoji}
                    setFocusEmoji={setFocusEmoji}
                />
                <EmojiButton
                    // repEmoji={downRepEmoji}
                    emoji1="👎"
                    emoji2="😠"
                    emoji3="💔"
                    emoji1_num={dislike}
                    emoji2_num={angry}
                    emoji3_num={heartbroken}
                    focusEmoji={focusEmoji}
                    setFocusEmoji={setFocusEmoji}
                />
            </div>
            
        </div>
    )
};

interface ReviewSectionProps {
    product_id: number;
}

const ReviewSection: React.FC<ReviewSectionProps> = ({ product_id }) => {
    const [reviews, setReviews] = React.useState<ReviewProps[]>([]);
    const [filter, setFilter] = React.useState<string>('');
    const [avgStar, setAvgStar] = React.useState<number>(0);
    const [oneStar, setOneStar] = React.useState<number>(0);
    const [twoStar, setTwoStar] = React.useState<number>(0);
    const [threeStar, setThreeStar] = React.useState<number>(0);
    const [fourStar, setFourStar] = React.useState<number>(0);
    const [fiveStar, setFiveStar] = React.useState<number>(0);

    useEffect(() => {
        const fetchReviews = async () => {
            let sum = 0, one = 0, two = 0, three = 0, four = 0, five = 0;
            const { data } = await axios.get(`${backendurl}/api/1.0/review/product/${product_id}`);
            const reviews = data.data;
            setReviews(reviews);
            for (let review of reviews) {
                sum += review.star;
                switch (review.star) {
                    case 1:
                        one += 1;
                        break;
                    case 2:
                        two += 1;
                        break;
                    case 3:
                        three += 1;
                        break;
                    case 4:
                        four += 1;
                        break;
                    case 5:
                        five += 1;
                        break;
                }
            }
            setAvgStar(Number((sum / reviews.length).toFixed(1)));
            setOneStar(one);
            setTwoStar(two);
            setThreeStar(three);
            setFourStar(four);
            setFiveStar(five);
        }

        fetchReviews();
    }, []);

    return (
        <div className='flex flex-col w-2/5 m-auto'>
            <TotalRatings
                avgRating={avgStar}
                numOfRatings={reviews.length}
                oneStar={oneStar}
                twoStar={twoStar}
                threeStar={threeStar}
                fourStar={fourStar}
                fiveStar={fiveStar}
            />
            <div className="flex flex-row">
                <FilterButton title={`最新`} filter={filter} setFilter={setFilter} />
                <FilterButton title={`最多讚`} filter={filter} setFilter={setFilter} />
            </div>
            <div className="flex flex-row">
                <FilterButton title={`五星`} filter={filter} setFilter={setFilter} />
                <FilterButton title={`四星`} filter={filter} setFilter={setFilter} />
                <FilterButton title={`三星`} filter={filter} setFilter={setFilter} />
                <FilterButton title={`二星`} filter={filter} setFilter={setFilter} />
                <FilterButton title={`一星`} filter={filter} setFilter={setFilter} />
            </div>
            {/* {reviews.map(({ id, is_private, star, height, weight, style, size_review, review, date, user_id, product_id, size, color_name, color_code, like, excited, love, dislike, angry, heartbroken }) => {
                return (
                    (filter === "" || filter === "五星" && star === 5 || filter === "四星" && star === 4 ||
                        filter === "三星" && star === 3 || filter === "二星" && star === 2 ||
                        filter === "一星" && star === 1) && (
                            <Review
                                key={id} // Add a unique key for each review
                                id={id}
                                is_private={is_private}
                                star={star}
                                height={height}
                                weight={weight}
                                style={style}
                                size_review={size_review}
                                review={review}
                                date={date}
                                user_id={user_id}
                                product_id={product_id}
                                size={size}
                                color_name={color_name}
                                color_code={color_code}
                                username={`test`}
                                like={like}
                                excited={excited}
                                love={love}
                                dislike={dislike}
                                angry={angry}
                                heartbroken={heartbroken}
                            />
                        )
                );
            })} */}
            {reviews
                .filter(({ star }) => (
                    filter === "" || filter === "最新" || filter === "最多讚" ||
                    (filter === "五星" && star === 5) ||
                    (filter === "四星" && star === 4) ||
                    (filter === "三星" && star === 3) ||
                    (filter === "二星" && star === 2) ||
                    (filter === "一星" && star === 1)
                ))
                .sort((a, b) => {
                    if (filter === "最新") {
                        const dateA = new Date(a.date);
                        const dateB = new Date(b.date);
                        return dateB.getTime() - dateA.getTime();
                    }
                    if (filter === "最多讚") {
                        const totalA = a.like + a.excited + a.love;
                        const totalB = b.like + b.excited + b.love;
                        return totalB - totalA;
                    }
                    return 0;
                })
                .map(({ username, id, is_private, star, height, weight, style, size_review, review, date, user_id, product_id, size, color_name, color_code, like, excited, love, dislike, angry, heartbroken }) => (
                    <Review
                    key={id}
                    id={id}
                    is_private={is_private}
                    star={star}
                    height={height}
                    weight={weight}
                    style={style}
                    size_review={size_review}
                    review={review}
                    date={date}
                    user_id={user_id}
                    product_id={product_id}
                    size={size}
                    color_name={color_name}
                    color_code={color_code}
                    username={username}
                    like={like}
                    excited={excited}
                    love={love}
                    dislike={dislike}
                    angry={angry}
                    heartbroken={heartbroken}
                    />
                ))
            }
        </div>
    );
};

export default ReviewSection;