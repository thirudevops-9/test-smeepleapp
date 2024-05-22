import {Box, Typography} from '@mui/material';
import {GREY_X_LIGHT, SMEEPLE_GREEN_DARK} from '../../../styles/theme';
import {Loading} from '../../layout/components';
import useExpertReviewSummaryQuery from '../hooks/useExpertReviewSummaryQuery';

interface Props {
  expertId: number;
}

function ExpertRatingBarChart({expertId}: Props) {
  const {data: reviewSummary, isSuccess} = useExpertReviewSummaryQuery(expertId);

  if (!isSuccess) return <Loading />;

  const reviews = [
    reviewSummary.fiveStarReviews,
    reviewSummary.fourStarReviews,
    reviewSummary.threeStarReviews,
    reviewSummary.twoStarReviews,
    reviewSummary.oneStarReviews,
  ];

  const totalBarWidth = 60;

  return (
    <Box mt={2}>
      {reviews.map((x, index) => {
        const barValue = totalBarWidth * x;
        const remainderBarValue = totalBarWidth - barValue;
        return (
          // eslint-disable-next-line react/no-array-index-key
          <Box display="flex" flexDirection="row" alignItems="center" key={index}>
            <Typography fontWeight="600" variant="body2" color={SMEEPLE_GREEN_DARK} width="18%">
              {`${reviews.length - index}`} star
            </Typography>
            <Box sx={{backgroundColor: SMEEPLE_GREEN_DARK, width: `${barValue}%`, height: 20}} />
            <Box sx={{backgroundColor: GREY_X_LIGHT, width: `${remainderBarValue}%`, height: 20}} />
            <Typography
              fontWeight="600"
              variant="body2"
              color={SMEEPLE_GREEN_DARK}
              ml={2}
            >{`${Math.round(x * 100)}%`}</Typography>
          </Box>
        );
      })}
    </Box>
  );
}

export default ExpertRatingBarChart;
