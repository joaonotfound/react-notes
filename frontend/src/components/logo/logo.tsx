import { Text } from '@mantine/core'
import { createStyles } from '@mantine/core';

export const Logo = () => {
    const useStyle = createStyles(theme => ({
        "logo": {
            fontSize: 18,
            letterSpacing: 1.05,
            color: "gray",
            ":hover": {
                "cursor": 'pointer'
            }
        }
    }))
    const { classes } = useStyle();
    return <Text weight="bold" className={classes.logo} color={'blue'} >Notes</Text>
}