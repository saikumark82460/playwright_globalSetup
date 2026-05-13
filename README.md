CONFIGURATION

1. Copy the ".env.example" file and rename your copy to ".env"
2. Set the values in the .env file as needed

AUTOMATED TESTING PLATFORM

If you are using the Automated Testing Platform, be sure to configure the .env.autotest-platform file with the appropriate values.

1. REPORTING in the .env.autotest-platform file MUST be "[['dot'],['html', { open: 'never}]]" or the platform will not be able to determine the failed test count.

DEBUGGING

Use the JavaScript Debug Console:
1. View > Debug Console
2. In the upper right of the debug console pane, click the down arrow next to the plus icon to add a new "JavaScript Debug Terminal".
3. At the prompt enter "npm run debug"
4. Your breakpoints will now be hit.