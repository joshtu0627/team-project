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

interface FilterButtonProps {
  title: string;
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

const FilterButton: React.FC<FilterButtonProps> = ({ title }) => {
    return (
    <div>
        <button
            className='border p-2 mx-5'
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

    const handleEmojiPopoverOpen = (event: React.MouseEvent<HTMLElement>) => {setEmojiAnchorEl(event.currentTarget);};
    const handleEmojiPopoverClose = () => {setEmojiAnchorEl(null);};
    const handleNumberPopoverOpen = (event: React.MouseEvent<HTMLElement>) => {setNumberAnchorEl(event.currentTarget);};
    const handleNumberPopoverClose = () => {setNumberAnchorEl(null);};

    const openEmoji = Boolean(emojiAnchorEl);
    const openNumber = Boolean(numberAnchorEl);

    const handleEmojiClicked = (emoji: string) => {
        if (focusEmoji === emoji) {
            setFocusEmoji('');
        } else {
            setFocusEmoji(emoji);
        }
    }

    return (
        <div>
            <PopupState variant="popover" popupId="demo-popup-popover">
                {(popupState) => (
                    <div>
                        <Button variant="contained" {...bindHover(popupState)}>
                            {emoji1}
                        </Button>
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
                            <Button><span role="img" aria-label="emoji">{emoji1}</span></Button>
                            <Button><span role="img" aria-label="emoji">{emoji2}</span></Button>
                            <Button><span role="img" aria-label="emoji">{emoji3}</span></Button>
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
                {emoji1_num + emoji2_num + emoji3_num}
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
                <p>{emoji1} {emoji1_num}</p>
                <p>{emoji2} {emoji2_num}</p>
                <p>{emoji3} {emoji3_num}</p>
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
        <div>
            <div className="border-t border-gray-300 pt-4 mt-4"></div>
            <div>
                <p className="font-semibold text-lg">{username}</p>
                <p className="font-medium text-gray-400 text-sm">{date}</p>
            </div>
            <div>
                <Rating name="read-only" value={star} readOnly />
                <p>{height} cm ． {weight} kg ． {style}</p>
                <p>{color_name} ． {size} ． {size_review}</p>
            </div>
            <div>
                <p>{review}</p>
            </div>
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
    )
};

interface ReviewSectionProps {
    product_id: number;
}

const ReviewSection: React.FC<ReviewSectionProps> = ({ product_id }) => {
    const [reviews, setReviews] = React.useState<ReviewProps[]>([]);
    const [filter, setFilter] = React.useState<string>('');

    useEffect(() => {
        const fetchReviews = async () => {
            const { data } = await axios.get(`${backendurl}/api/1.0/review/product/${product_id}`);

            setReviews(data.data);
        }

        fetchReviews();
    }, []);

    return (
        <div className='flex flex-col'>
            <div className="flex flex-row">
                <FilterButton title={`最新`} />
                <FilterButton title={`最多讚`} />
            </div>
            <div className="flex flex-row">
                <FilterButton title={`五星`} />
                <FilterButton title={`四星`} />
                <FilterButton title={`三星`} />
                <FilterButton title={`二星`} />
                <FilterButton title={`一星`} />
            </div>
            {reviews.map(({ id, is_private, star, height, weight, style, size_review, review, date, user_id, product_id, size, color_name, color_code, like, excited, love, dislike, angry, heartbroken }) => {
                return (
                    <>
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
                    </>
                );
            })}
        </div>
    );
};

export default ReviewSection;
