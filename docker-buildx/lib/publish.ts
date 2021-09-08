import execa from 'execa';

async function publish(
  pluginConfig: { name: string },
  info: { nextRelease: { version: number }; logger },
) {
  info.logger.log(
    `Pushing version ${pluginConfig.name}:${info.nextRelease.version} to docker hub`,
  );

  // Push both new version and latest
  execa(
    'docker',
    [
      'buildx',
      'build',
      `--platform ${process.env.BUILDX_PLATFORMS}`,
      `--tag ${pluginConfig.name}:latest`,
      `--tag ${pluginConfig.name}:${info.nextRelease.version}`,
    ],
    { stdio: 'inherit' },
  );
}

export = publish;
