import React from 'react';
import Rating from '@mui/material/Rating';

interface TotalRatingsProps {
    avgRating: number;
    numOfRatings: number;
    oneStar: number;
    twoStar: number;
    threeStar: number;
    fourStar: number;
    fiveStar: number;
}

const TotalRatings: React.FC<TotalRatingsProps> = (props) => {
    const { avgRating, numOfRatings, oneStar, twoStar, threeStar, fourStar, fiveStar } = props;
    const onePercent = oneStar / numOfRatings * 100 + "%";
    const twoPercent = twoStar / numOfRatings * 100 + "%";
    const threePercent = threeStar / numOfRatings * 100 + "%";
    const fourPercent = fourStar / numOfRatings * 100 + "%";
    const fivePercent = fiveStar / numOfRatings * 100  + "%";
    if (!avgRating) return null;
    return (
        <div>
            <div className='flex flex-col'>
                <span
                    className='text-4xl font-bold'
                >
                    {avgRating}
                </span>
                <Rating name="half-rating-read" defaultValue={avgRating} precision={0.1} readOnly size="large"/>
                <span
                    className='text-xl text-gray-400'
                >
                    ({numOfRatings})
                </span>
            </div>
            <div className="">
                <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700 my-2">
                    <div className="bg-yellow-400 h-2.5 rounded-full" style={{ width: fivePercent }}></div>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700 my-2">
                    <div className="bg-yellow-400 h-2.5 rounded-full" style={{ width: fourPercent }}></div>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700 my-2">
                    <div className="bg-yellow-400 h-2.5 rounded-full" style={{ width: threePercent }}></div>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700 my-2">
                    <div className="bg-yellow-400 h-2.5 rounded-full" style={{ width: twoPercent }}></div>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700 my-2">
                    <div className="bg-yellow-400 h-2.5 rounded-full" style={{ width: onePercent }}></div>
                </div>
            </div>
        </div>
    );
};

export default TotalRatings;