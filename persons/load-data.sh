for f in *.json
do
  curl -X PUT -H "Content-Type: application/json" -d "@$f" 192.168.10.3:8080/person
  echo " <- $f"
done
