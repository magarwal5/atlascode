import { InlineTextEditorList, SwitchWithLabel } from '@atlassianlabs/guipi-core-components';
import { Grid, Typography } from '@material-ui/core';
import React, { memo, useCallback, useContext, useEffect, useState } from 'react';
import { ConfigControllerContext } from '../configController';

type ConnectivityProps = {
    enableHttpsTunnel: boolean;
    onlineCheckerUrls: string[];
};

export const Connectivity: React.FunctionComponent<ConnectivityProps> = memo(
    ({ enableHttpsTunnel, onlineCheckerUrls }) => {
        const controller = useContext(ConfigControllerContext);

        const [changes, setChanges] = useState<{ [key: string]: any }>({});

        const handleCheckedChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
            const changes = Object.create(null);
            changes[`${e.target.value}`] = e.target.checked;
            setChanges(changes);
        }, []);

        const handleUrlsChange = useCallback((urls: string[]) => {
            const changes = Object.create(null);
            changes['onlineCheckerUrls'] = urls;
            setChanges(changes);
        }, []);

        useEffect(() => {
            if (Object.keys(changes).length > 0) {
                controller.updateConfig(changes);
                setChanges({});
            }
        }, [changes, controller]);

        return (
            <Grid container direction="column" spacing={3}>
                <Grid item>
                    <SwitchWithLabel
                        size="small"
                        color="primary"
                        id="enableHttpsTunnel"
                        value="enableHttpsTunnel"
                        checked={enableHttpsTunnel}
                        onChange={handleCheckedChange}
                        label="Enable https tunneling for proxies that only have an http endpoint"
                    />
                </Grid>
                <Grid item>
                    <Typography variant="body1">
                        The following urls will be ping'ed periodically to check for online connectivity
                    </Typography>
                    <InlineTextEditorList
                        disabled={false}
                        options={onlineCheckerUrls}
                        addOptionButtonContent="Add URL"
                        inputLabel="Custom Ping URL"
                        onChange={handleUrlsChange}
                    />
                </Grid>
            </Grid>
        );
    }
);
