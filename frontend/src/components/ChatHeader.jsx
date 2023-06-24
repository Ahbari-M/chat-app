import { Autocomplete, Avatar, Box, Chip, Stack, TextField, Typography, alpha } from '@mui/material';
import React, { useState } from 'react'
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import parse from 'autosuggest-highlight/parse';
import match from 'autosuggest-highlight/match';

function ChatHeader({contacts, members=[], onAddMembers}) {
  const [query, setQuery] = useState('');

  const handleAddMembers = (members) => {
    setQuery('');
    onAddMembers(members);
  };
  return (
    <Stack
      spacing={2}
      direction={'row'}
      sx={{
      alignItems: 'center',
      padding: 3,
    }} >
      <Typography component={'span'} variant='h5'>start new chat</Typography>
        <Autocomplete
          multiple
          size="small"
          sx={{ minWidth: 200 }}
          disablePortal
          popupIcon={null}
          noOptionsText={'no results'}
          onChange={(event, value) => handleAddMembers(value)}
          onInputChange={(event, value) => setQuery(value)}
          options={contacts}
          getOptionLabel={(member) => member}
          renderOption={(props, member, { inputValue, selected }) => {
            const  avatar  = member;
            const matches = match(member, inputValue);
            const parts = parse(member, matches);
            return (
              <Box
                component="li"
                {...props}
              >
                <Box
                  sx={{
                    mr: 1.5,
                    width: 32,
                    height: 32,
                    position: 'relative',
                  }}
                >
                  <Avatar
                    sx={{
                      width: 32,
                      height: 32,
                    }}
                    alt={member}
                    src={avatar}
                  />
                  <Box
                    sx={{
                      top: 0,
                      opacity: 0,
                      width: '100%',
                      height: '100%',
                      display: 'flex',
                      position: 'absolute',
                      alignItems: 'center',
                      justifyContent: 'center',
                      ...(selected && {
                        opacity: 1,
                        color: 'primary.main',
                      }),
                    }}
                  >
                    <CheckBoxIcon />
                  </Box>
                </Box>

                {parts.map((part, index) => (
                  <Typography key={index} variant="subtitle2" color={part.highlight ? 'primary' : 'text.primary'}>
                    {part.text}
                  </Typography>
                ))}
              </Box>
            );
          }}
          renderTags={(members, getTagProps) =>
            members.map((member, index) => {
              return (
                <Chip
                  {...getTagProps({ index })}
                  key={index}
                  size="small"
                  label={member}
                  color="info"
                  avatar={<Avatar alt={member} src={''} />}
                />
              );
            })
          }
          renderInput={(params) => <TextField {...params} placeholder={members.length === 0 ? 'members' : ''} />}
      />
      </Stack>
  )
}

export default ChatHeader