import {Box, Stack, Typography} from '@mui/material';
import {ORANGE} from '../../../styles/theme';
import type {Category} from '../types';

function CategoryBadge({
  category,
  color,
  onClick,
}: {
  category: Category;
  color?: string;
  onClick?: () => void;
}) {
  return (
    <Box display="flex" onClick={onClick} sx={{cursor: onClick ? 'pointer' : undefined}}>
      <Stack
        direction="row"
        sx={{
          background: color || ORANGE,
          borderRadius: 2,
        }}
        p={1.5}
        alignItems="center"
      >
        {category.icon && <img src={category.icon} height={25} width={25} alt={category.name} />}
        <Typography variant="body2" sx={{ml: 1, textTransform: 'uppercase', fontWeight: 'bold'}}>
          {category.name}
        </Typography>
      </Stack>
    </Box>
  );
}

export default CategoryBadge;
