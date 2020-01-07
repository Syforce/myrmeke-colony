import { ConnectionType } from './connection-type.enum';

export enum LiveConnectionType {
	LIVE_POSTGRES = (ConnectionType.POSTGRES + 10)
}

export const upgradeConnectionType = (type: ConnectionType | LiveConnectionType): LiveConnectionType => {
	switch (type) {
		case ConnectionType.POSTGRES: {
			return LiveConnectionType.LIVE_POSTGRES
		}

		console.log(`Unsupported upgrade to Live connection of type ${type}`);
	}
}