import { Grid, TextField, Typography } from '@mui/material';
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
  disabled
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
          <Typography variant='h4' id="main-label">
            {label ?? ''} {required === true ? <span className="span-star"> * </span> : ''}
          </Typography>
        </Grid>

        <Grid item xs={12} className={`${className}-input`}>
          <Controller
            control={control}
            defaultValue={defaultValue}
            name={name}
            render={({ field }) => (
              <>
                {textarea && (
                  <TextField {...field} required={required} multiline fullWidth rows={4} id="form-large-textarea-input" />
                )}
                {!textarea && smalltextField && !fullwidth && (
                  <TextField {...field} type={type} placeholder={placeholder} disabled={disabled} className="txtfield-box-small" required={required} id="form-small-textfield-input" />
                )}
                {!textarea && !smalltextField && fullwidth && !size && (
                  <TextField {...field} type={type} placeholder={placeholder} disabled={disabled} fullWidth className="txtfield-box-large" required={required} id="form-large-textfield-input" />
                )}
                {!textarea && !smalltextField && !fullwidth && (
                  <TextField {...field} type={type} placeholder={placeholder} disabled={disabled} className="txtfield-box" required={required} id="form-textfield-input" />
                )}
                {!textarea && !smalltextField && fullwidth && size == "small" && (
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
