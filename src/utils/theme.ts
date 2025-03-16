
export const theme = {
    components: {
        NavLink: {
            // Subscribe to theme and component params
            // @ts-ignore
            styles: (theme, params) => ({
                root: {
                    backgroundColor:
                        params.variant === 'filled'
                            ? "#bbe3f0"
                            : undefined,
                    '&:hover': {
                        backgroundColor: params.variant === 'filled'
                            ? '#b1c3c9' : 'transparent'
                    }
                },
            }),
        },
    }
}