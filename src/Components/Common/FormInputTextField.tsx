import { Grid, MenuItem, TextField, Typography } from '@mui/material';
import { platform } from 'os';
import React, { useEffect, useState } from 'react';
import { Controller } from 'react-hook-form'

interface LayoutProps {
  id: string;
  label?: string;
  placeholder?: string;
  type?: string;
  required?: boolean;
  name: string;
  control?: any;
  defaultValue?: any;
  textarea?: boolean;
  smalltextField?: boolean;
  fullwidth?: boolean;
  size?: string,
  className?: string;
  disabled?: boolean;
  caption?: string;
  selectOptions?: string[];
  selectPlaceholder?: string;
}

const FormInputTextField = ({
  label,
  placeholder,
  type,
  required,
  name,
  control,
  defaultValue,
  textarea,
  smalltextField,
  fullwidth,
  size,
  className,
  caption,
  disabled,
  selectOptions,
  selectPlaceholder
}: LayoutProps) => {

  const [textType, setTextType] = useState("text")

  useEffect(() => {
    if (type) {
      setTextType(type)
    }
  },[]);

  return (
    <Grid className='textfieldcontainer'>
      <Grid item container xs={12} className={className} pt={1}>
        <Grid item className={`${className}-label`}>
          <Typography
            variant='h5'
            id="main-label"
            sx={{ fontSize: '0.93rem', color: 'black', fontWeight: 500, lineHeight: 1.5 }}
          >
            {label ?? ''} {required === true ? <span className="span-star"> * </span> : ''}
          </Typography>
        </Grid>

        <Grid item xs={12} className={`${className}-input`}>
          <Controller
            control={control}
            defaultValue={defaultValue ?? ''}
            name={name}
            render={({ field }) => (
              <>
                {selectOptions && (
                  <TextField {...field} select fullWidth className="txtfield-box-large" required={required} id="form-select-input" SelectProps={{ displayEmpty: true }}>
                    {selectPlaceholder && (
                      <MenuItem value="" disabled sx={{ color: 'black', opacity: 1 }}>
                        {selectPlaceholder}
                      </MenuItem>
                    )}
                    {selectOptions.map((option) => (
                      <MenuItem key={option} value={option}>
                        {option}
                      </MenuItem>
                    ))}
                  </TextField>
                )}
                {textarea && (
                  <TextField {...field} required={required} multiline fullWidth rows={4} id="form-large-textarea-input" />
                )}
                {!selectOptions && !textarea && smalltextField && !fullwidth && (
                  <TextField {...field} type={type} placeholder={placeholder} disabled={disabled} className="txtfield-box-small" required={required} id="form-small-textfield-input" />
                )}
                {!selectOptions && !textarea && !smalltextField && fullwidth && !size && (
                  <TextField {...field} type={type} placeholder={placeholder} disabled={disabled} fullWidth className="txtfield-box-large" required={required} id="form-large-textfield-input" />
                )}
                {!selectOptions && !textarea && !smalltextField && !fullwidth && (
                  <TextField {...field} type={type} placeholder={placeholder} disabled={disabled} className="txtfield-box" required={required} id="form-textfield-input" />
                )}
                {!selectOptions && !textarea && !smalltextField && fullwidth && size == "small" && (
                  <TextField {...field} type={type} placeholder={placeholder} disabled={disabled} className="txtfield-box" required={required} size={"small"} fullWidth id="form-small-textfield-input" />
                )}
              </>
            )}
          />
        </Grid>

        {caption ? (
          <Grid item className={`${className}-caption`}>
            <Typography variant='h5' id="sub-label">
              {caption}
            </Typography>
          </Grid>
        ) : (
          <></>
        )}
      </Grid>
    </Grid>
  );
};

export default FormInputTextField;
