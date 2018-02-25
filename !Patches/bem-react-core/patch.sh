#!/sbin/sh
# @since 2018.02.23, 23:35
# @version 2018.02.23, 23:35

ORIGPATH=`pwd`

# Patching root (finding this folder in parents recursively).
while [ ! -d "$ROOT" ]; do
    echo "? $ROOT"
    ROOT="../$ROOT"
done

# Target path relative to root
PATCHCD="bem-react-core"

echo "patching in $ROOT/$PATCHCD"
cd "$ROOT/$PATCHCD"

# Patching file
PATCHFILE="package.json@1.0.0-rc.6.diff"
echo "patching with $PATCHFILE"
cp "$ORIGPATH/$PATCHFILE" .
patch -lb < "$PATCHFILE"

cd $ORIGPATH

