import { Grid } from '@material-ui/core'
import React from 'react'

const Heading: React.FC<{ title: string }> = ({ title }) => {
    return (
        <Grid xs={12} className="page-header">
            <Grid className="page-header-inner">
                <h1 className="page-header-title">{title}</h1>
            </Grid>
        </Grid>
    )
}

export default Heading;
