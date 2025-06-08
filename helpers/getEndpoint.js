const { execSync } = require('child_process');

try {
  // Query CloudFormation for the ServiceEndpoint output
  const raw = execSync(
    `aws cloudformation describe-stacks \
      --stack-name serverless-todo-cicd-cicd \
      --query "Stacks[0].Outputs[?OutputKey=='ServiceEndpoint'].OutputValue" \
      --output text`
  ).toString().trim();

  if (!raw) {
    console.error('❌ ServiceEndpoint not found in CloudFormation outputs');
    process.exit(1);
  }

  console.log(raw);
} catch (err) {
  console.error('❌ Error fetching ServiceEndpoint:', err.message);
  process.exit(1);
}

