all: manualjunkaction.xpi

manualjunkaction.xpi:
	make -f Makefile.chrome -C chrome manualjunkaction.jar
	rm -f $@
	zip $@ chrome/manualjunkaction.jar install.rdf license.txt chrome.manifest

babelzilla:
	make -f Makefile.chrome -C chrome babelzilla
	rm -rf manualjunkaction.xpi
	zip manualjunkaction.xpi chrome/manualjunkaction.jar install.rdf license.txt chrome.manifest

localize:
	rm -rf chrome/locale/*
	wget http://www.babelzilla.org/wts/download/locale/all/replaced/5241 -O chrome/locale/locales.tar.gz
	cd chrome/locale/; tar xzf locales.tar.gz
	rm -rf chrome/locale/locales.tar.gz

clean:
	rm -f chrome/manualjunkaction.jar manualjunkaction.xpi
