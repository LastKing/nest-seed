#!/usr/bin/env bash
# $0 is a script name,
# $1, $2, $3 etc are passed arguments
# $1 is our command

CMD=$1

case "$CMD" in
  "dev" )
    export NODE_ENV=development
    exec npm run start:prod
    ;;

  "testing" )
    export NODE_ENV=testing
    exec npm run start:prod
    ;;

  "production" )
    export NODE_ENV=production
    exec npm run start:prod
    ;;

   * )
    # Run custom command. Thanks to this line we can still use
    # "docker run our_image /bin/bash" and it will work
    exec ${CMD} ${@:2}
    ;;
esac


