import type {ReactNode} from 'react';
import {faCircleExclamation} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import CheckIcon from '@mui/icons-material/Check';
import {
  Box,
  Button,
  Chip,
  Divider,
  IconButton,
  Rating,
  Stack,
  Typography,
  useTheme,
} from '@mui/material';
import SmeProfileGradient from '../../../assets/SmeProfileGradient.svg';
import FacebookLogo from '../../../assets/fb_logo.png';
import InstagramLogo from '../../../assets/insta_logo.png';
import LinkedInLogo from '../../../assets/li_logo.png';
import TikTokLogo from '../../../assets/tiktok_logo.png';
import TwitchLogo from '../../../assets/twitch_logo.png';
import YouTubeLogo from '../../../assets/youtube_logo.png';
import {
  ORANGE_DARK,
  ORANGE_LIGHT,
  SMEEPLE_GREEN,
  SMEEPLE_GREEN_DARK,
  SMEEPLE_GREEN_LIGHT,
} from '../../../styles/theme';
import type {Category} from '../../categories/types';
import {Loading} from '../../layout/components';
import {getUsdDisplay} from '../../shared/services/usdDisplayer';
import type {ExpertDetailsModel} from '../types/ExpertDetailsModel';
import type {ExpertGalleryModel} from '../types/ExpertGalleryModel';
import ExpertProfilePhoto from './ExpertProfilePhoto';
import ExpertRatingBarChart from './ExpertRatingBarChart';
import ExpertReviews from './ExpertReviews';

export const PROFILE_WIDTH = 367;
export const PROFILE_PHOTO_WIDTH = PROFILE_WIDTH / 5;

function ProfileDivider() {
  return <Divider sx={{backgroundColor: SMEEPLE_GREEN, my: 2}} />;
}

function ProfileSection({
  title,
  subtitle,
  children,
  isFirst,
  shouldShow,
}: {
  title: string;
  subtitle?: string;
  children: ReactNode;
  isFirst?: boolean;
  shouldShow: boolean;
}) {
  return shouldShow ? (
    <Box alignItems="stretch" alignSelf="stretch">
      {!isFirst && <ProfileDivider />}
      <Typography variant="h5" sx={{textTransform: 'uppercase', mb: subtitle ? 0 : 1}}>
        {title}
      </Typography>
      {!!subtitle && (
        <Typography variant="h6" sx={{mb: 1}}>
          {subtitle}
        </Typography>
      )}

      {children}
    </Box>
  ) : null;
}

function SocialButton({url, src, alt}: {url?: string | null; src: string; alt: string}) {
  if (!url) return null;
  const handleClick = () => window.open(url, '_blank');
  return (
    <IconButton color="primary" aria-label="upload picture" component="label" onClick={handleClick}>
      <img src={src} alt={alt} width={36} />
    </IconButton>
  );
}

function CheckListItem({label}: {label: string}) {
  return (
    <Stack direction="row" alignItems="center">
      <CheckIcon color="secondary" sx={{height: 20, mr: 1}} />
      <Typography variant="body2" style={{wordBreak: 'break-word'}}>
        {label}
      </Typography>
    </Stack>
  );
}

function ExpertRating({rating, label}: {rating: number; label: string}) {
  return (
    <Stack direction="row">
      <Rating
        name="expert-rating"
        precision={0.5}
        value={rating}
        readOnly
        size="small"
        sx={{color: SMEEPLE_GREEN_DARK}}
      />
      <Typography
        variant="caption"
        sx={{
          alignSelf: 'flex-end',
          fontWeight: 'bold',
          mt: '1px',
          ml: 0.5,
          color: SMEEPLE_GREEN_DARK,
        }}
      >
        {label}
      </Typography>
    </Stack>
  );
}

type Props = {
  expert?: ExpertDetailsModel;
  gallery?: ExpertGalleryModel;
  category?: Category;
  showSuspended?: boolean;
};

function ExpertProfile({expert, gallery, category, showSuspended = false}: Props) {
  const theme = useTheme();

  if (!expert || !gallery || !category) {
    return <Loading />;
  }

  if (!showSuspended && expert.isSuspended) {
    return (
      <Typography variant="h5" sx={{ml: 1}}>
        This expert is currently suspended from the platform.
      </Typography>
    );
  }

  if (!showSuspended && expert.isUserDisabled) {
    return (
      <Typography variant="h5" sx={{ml: 1}}>
        This user was removed from the platform.
      </Typography>
    );
  }

  return (
    <Stack direction="column" justifyContent="center" alignItems="center">
      {showSuspended && expert.isSuspended ? (
        <Typography
          variant="caption"
          px={1}
          py={0.5}
          mt={2}
          sx={{
            display: 'flex',
            borderRadius: '4px',
            backgroundColor: ORANGE_LIGHT,
            color: ORANGE_DARK,
            alignItems: 'center',
            gap: 0.5,
          }}
        >
          <FontAwesomeIcon icon={faCircleExclamation} size="xs" />
          This expert has been suspended.
        </Typography>
      ) : null}

      {showSuspended && expert.isUserDisabled ? (
        <Typography
          variant="caption"
          px={1}
          py={0.5}
          mt={2}
          sx={{
            display: 'flex',
            borderRadius: '4px',
            backgroundColor: ORANGE_LIGHT,
            color: ORANGE_DARK,
            alignItems: 'center',
            gap: 0.5,
          }}
        >
          <FontAwesomeIcon icon={faCircleExclamation} size="xs" />
          This user was removed from the platform.
        </Typography>
      ) : null}

      <Stack direction="row" my={3}>
        {!!category.icon && (
          <img src={category.icon} alt={category.name} style={{width: PROFILE_WIDTH / 10}} />
        )}
        <Typography variant="h5" sx={{ml: 1}}>
          {category.name}
        </Typography>
      </Stack>
      <Box
        width={`calc(100% + ${theme.spacing(4)})`}
        position="relative"
        mx={-2}
        alignItems="center"
        display="flex"
        flexDirection="column"
      >
        <img
          src={SmeProfileGradient}
          alt="background"
          style={{
            position: 'absolute',
            marginRight: 4,
            width: '100%',
            top: 40,
          }}
        />
        <ExpertProfilePhoto photoUrl={expert.photoUrl} size={PROFILE_PHOTO_WIDTH} />
        <Typography variant="h5" fontWeight="normal" mt={1}>
          {expert.firstName} {expert.lastName}
        </Typography>
        {!!expert.rating && (
          <ExpertRating rating={expert.rating} label={`(${expert.totalReviews})`} />
        )}
      </Box>
      <Box
        my={1}
        display="flex"
        flexWrap="wrap"
        alignItems="center"
        justifyContent="center"
        gap={1}
      >
        {expert.specialties.map((s) => (
          <Chip
            key={s.id}
            label={s.specialty}
            sx={{
              fontWeight: 'bold',
              color: SMEEPLE_GREEN_DARK,
              backgroundColor: SMEEPLE_GREEN_LIGHT,
            }}
            size="small"
          />
        ))}
      </Box>
      <Button variant="contained" size="large" sx={{mt: 1, mb: 2}} disabled>
        Check Availability
      </Button>
      {expert.appointmentDurationRates.some((adr) => adr.rate > 0) && (
        <Stack direction="row" mb={3}>
          <Chip label="$" size="small" sx={{alignSelf: 'center', mr: 1}} />
          <Typography variant="overline" sx={{fontWeight: 'bold'}}>
            Starts at{' '}
            {getUsdDisplay(Math.min(...expert.appointmentDurationRates.map((adr) => adr.rate)))}
          </Typography>
        </Stack>
      )}
      <ProfileSection title="How I can Help" shouldShow={expert.helpStatements.length > 0} isFirst>
        <Stack>
          {expert.helpStatements.map((hs) => (
            <CheckListItem key={hs.id} label={hs.helpStatement} />
          ))}
        </Stack>
      </ProfileSection>
      <ProfileSection
        title="Gallery"
        subtitle={`${gallery.images.length} Photos`}
        shouldShow={!!gallery.images.length}
      >
        <Box
          sx={{
            whiteSpace: 'nowrap',
            overflow: 'auto',
          }}
        >
          {gallery.images.map((item, i) => (
            <img
              style={{display: 'inline-block', height: 150, marginRight: 5}}
              key={item.expertGalleryImageId}
              src={`${item.url}?w=161&fit=crop&auto=format`}
              srcSet={`${item.url}?w=161&fit=crop&auto=format&dpr=2 2x`}
              alt={`Gallery Example ${i + 1}`}
              loading="lazy"
            />
          ))}
        </Box>
      </ProfileSection>
      <ProfileSection
        title="Biography"
        shouldShow={!!expert.biography || !!expert.languages || !!expert.location || !!expert.state}
      >
        <Typography variant="body2" sx={{wordWrap: 'break-word'}}>
          {expert.biography}
        </Typography>
        <Stack>
          {expert.languages && expert.languages.length > 0 ? (
            <CheckListItem label={`Language: ${expert.languages.join(', ')}`} />
          ) : null}
          {expert.location !== '' && expert.location && (
            <CheckListItem label={`Location: ${expert.location}`} />
          )}
          {expert.state !== '' && expert.state && (
            <CheckListItem label={`State: ${expert.state}`} />
          )}
        </Stack>
      </ProfileSection>
      <ProfileSection
        title="Social Networks"
        shouldShow={
          [
            expert.facebookUrl,
            expert.instagramUrl,
            expert.linkedInUrl,
            expert.youTubeUrl,
            expert.tikTokUrl,
            expert.twitchUrl,
          ].filter(Boolean).length > 0
        }
      >
        <Stack
          spacing={1}
          alignItems="center"
          justifyContent="center"
          direction="row"
          flexWrap="wrap"
        >
          <SocialButton url={expert.facebookUrl} src={FacebookLogo} alt="Facebook" />
          <SocialButton url={expert.instagramUrl} src={InstagramLogo} alt="Instagram" />
          <SocialButton url={expert.linkedInUrl} src={LinkedInLogo} alt="LinkedIn" />
          <SocialButton url={expert.youTubeUrl} src={YouTubeLogo} alt="YouTube" />
          <SocialButton url={expert.tikTokUrl} src={TikTokLogo} alt="TikTok" />
          <SocialButton url={expert.twitchUrl} src={TwitchLogo} alt="LinkedIn" />
        </Stack>
      </ProfileSection>

      <ProfileSection
        title="Customer Reviews"
        subtitle={`${expert.totalReviews} Reviews`}
        shouldShow
      >
        <ExpertRating
          rating={expert.rating ? expert.rating : 0}
          label={`${expert.rating ? expert.rating : 0} out of 5`}
        />
        <ExpertRatingBarChart expertId={expert.id} />
        <ExpertReviews expertId={expert.id} />
      </ProfileSection>
    </Stack>
  );
}

export default ExpertProfile;
