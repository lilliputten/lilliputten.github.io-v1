#!/sbin/sh
# @since 2018.02.23, 23:35
# @version 2018.02.23, 23:35

ORIGPATH=`pwd`

# Patching root (finding this folder in parents recursively).
ROOT="node_modules"
while [ ! -d "$ROOT" ]; do
    echo "? $ROOT"
    ROOT="../$ROOT"
done

# Target path relative to root
PATCHCD="react-scripts/config"

echo "patching in $ROOT/$PATCHCD"
cd "$ROOT/$PATCHCD"

# Patching file
PATCHFILE="webpackDevServer.config.js-@1.0.17.diff"
echo "patching with $PATCHFILE"
cp "$ORIGPATH/$PATCHFILE" .
patch -lb < "$PATCHFILE"

cd $ORIGPATH

