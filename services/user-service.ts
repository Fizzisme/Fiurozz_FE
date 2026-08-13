import { getCurrentUserAction } from '@/actions/user-action';

export const userService = {
    async getMe() {
        return getCurrentUserAction();
    },
};
