# lani.ground

## Create Link(Module)

```bash
yarn link
# and
yarn watch
```

## Linking Test(Playground)

```bash
yarn link mymodule
```


## Publish(root)

```bash
# 글로벌 lerna 설치 후
lerna publish

or

# 로컬 lerna 설치 후
npx lerna publish

or

# package.json에 작성된 버전으로 배포
npx lerna publish from-package
```