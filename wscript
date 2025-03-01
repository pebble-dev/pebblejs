#
# This file is the default set of rules to compile a Pebble project.
#
# Feel free to customize this to your needs.
#
import os
import shutil
import waflib

top = '.'
out = 'build'


def distclean(ctx):
    if os.path.exists('dist.zip'):
        os.remove('dist.zip')
    if os.path.exists('dist'):
        shutil.rmtree('dist')
    waflib.Scripting.distclean(ctx)


def options(ctx):
    ctx.load('pebble_sdk')


def configure(ctx):
    ctx.env.CFLAGS = ['-std=c11',
                      '-fms-extensions',
                      '-Wno-address',
                      '-Wno-type-limits',
                      '-Wno-missing-field-initializers']
    ctx.load('pebble_sdk')

    for _, env in ctx.all_envs.iteritems():
        if '-std=c99' in env.CFLAGS:
            env.CFLAGS.remove('-std=c99')
    ctx.env.WEBPACK = "./webpack.sh"



def build(ctx):
    ctx.load('pebble_sdk')

    build_worker = os.path.exists('worker_src')
    binaries = []

    cached_env = ctx.env
    for platform in ctx.env.TARGET_PLATFORMS:
        ctx.env = ctx.all_envs[platform]
        ctx.set_group(ctx.env.PLATFORM_NAME)
        app_elf = '{}/pebble-app.elf'.format(ctx.env.BUILD_DIR)
        ctx.pbl_build(source=ctx.path.ant_glob('src/c/**/*.c'), target=app_elf, bin_type='app')

        if build_worker:
            worker_elf = '{}/pebble-worker.elf'.format(ctx.env.BUILD_DIR)
            binaries.append({'platform': platform, 'app_elf': app_elf, 'worker_elf': worker_elf})
            ctx.pbl_build(source=ctx.path.ant_glob('worker_src/c/**/*.c'),
                          target=worker_elf,
                          bin_type='worker')
        else:
            binaries.append({'platform': platform, 'app_elf': app_elf})
    ctx.env = cached_env

    ctx.set_group('bundle')
    ctx.pbl_bundle(binaries=binaries,
                   js=ctx.path.ant_glob(['src/pkjs/**/*.ts',
                                         'src/pkjs/**/*.json',
                                         'src/common/**/*.ts']),
                   js_entry_file='src/pkjs/index.ts')
