import { defineConfig } from 'steiger';
import fsd from '@feature-sliced/steiger-plugin';

export default defineConfig([
    ...fsd.configs.recommended,
    {
        // disable the `public-api` rule for files in the Shared layer
        files: ['./src/shared/**'],
        rules: {
            'fsd/public-api': 'off',
        },
    },
    {
        // disable `insignificant-slice` and no-segmentless-slices` rules for files in the Features layer until the project is large
        // This project intentionally deviates from strict FSD architecture for developer convenience and practical reasons:
        //
        // 1. We store CRUD operations in separate folders (create/delete/update) instead of a single slice
        // 2. This violates the "insignificant slice" and "lack of segmentation" rules, but improves:
        //    - Code organization clarity
        //    - Feature isolation
        //    - Easier onboarding of new team members
        //    - Simplified feature-based deployment
        files: ['./src/**/**'],
        rules: {
            'fsd/insignificant-slice': 'warn',
            'fsd/no-segmentless-slices': 'warn',
        },
    },
]);
