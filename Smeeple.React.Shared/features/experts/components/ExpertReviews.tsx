import {Avatar, Box, Button, Rating, Typography, useTheme} from '@mui/material';
import {format, parseISO} from 'date-fns';
import {SMEEPLE_GREEN_DARK} from '../../../styles/theme';
import {Loading} from '../../layout/components';
import useExpertReviewQuery from '../hooks/useExpertReviewQuery';

interface Props {
  expertId: number;
}

function ExpertReviews({expertId}: Props) {
  const theme = useTheme();
  const {
    data: expertReviews,
    hasNextPage,
    isSuccess,
    isFetchingNextPage,
    fetchNextPage,
  } = useExpertReviewQuery(expertId);

  if (!isSuccess) return <Loading />;
  const reviews = expertReviews.pages.flatMap((x) => x.items);

  const getInitials = (firstName: string, lastName: string) => {
    if (firstName !== null && lastName !== null) {
      return `${firstName.charAt(0).toUpperCase()}${lastName.charAt(0).toUpperCase()}`;
    }
    return '';
  };

  return (
    <Box mb={5}>
      {reviews.map((r) => (
        <Box key={r.id}>
          <Box display="flex" flexDirection="row" alignItems="center" mt={2}>
            <Avatar style={{marginRight: 10, color: theme.palette.text.primary}}>
              {getInitials(r.reviewerFirstName, r.reviewerLastName)}
            </Avatar>
            {r.reviewerFirstName !== null && r.reviewerLastName !== null ? (
              <>
                <Typography style={{marginRight: 5}}>{r.reviewerFirstName}</Typography>
                <Typography>
                  {r.reviewerLastName !== null ? `${r.reviewerLastName.charAt(0)}.` : ''}
                </Typography>
              </>
            ) : (
              <Typography>Anonymous</Typography>
            )}
          </Box>
          <Rating
            name="review-rating"
            precision={0.5}
            value={r.rating}
            readOnly
            size="small"
            sx={{color: SMEEPLE_GREEN_DARK}}
          />
          <Typography
            variant="h6"
            color={theme.palette.common.black}
            style={{wordBreak: 'break-word'}}
          >
            {r.title}
          </Typography>
          <Typography variant="body2" color={theme.palette.grey[600]}>
            {`Reviewed on ${format(parseISO(r.dateCreated), 'MMMM dd, yyyy')}`}
          </Typography>
          <Typography variant="body2" style={{wordBreak: 'break-word'}}>
            {r.message}
          </Typography>
        </Box>
      ))}
      {hasNextPage && (
        <Box width="100%" mt={2} style={{textAlign: 'center'}}>
          <Button
            variant="contained"
            disabled={isFetchingNextPage}
            onClick={() => {
              fetchNextPage();
            }}
          >
            Load More
          </Button>
        </Box>
      )}
    </Box>
  );
}

export default ExpertReviews;
